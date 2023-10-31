import { arrayMoveImmutable } from 'array-move';
import cloneDeep from 'lodash/cloneDeep';
import { action, observable } from 'mobx';
import { genNonDuplicateId } from '../../utils/common';
//import sendToIframe from '../../utils/sendToIframe';
import { EditorManager } from '../../manager';
import type { EditorData, BaseSchemaClass } from '../../design';
/**
 * 页面类型
 * component 单个组件属性配置页面
 * componentList 组件管理列表
 * pageSet  页面设置
 */
export type ModalType = 'component' | 'componentList' | 'pageSet';

export type editorStoreType = {
  modalType: ModalType; // 右侧模板类型
  init: (manager: EditorManager) => void;
  pageinfo: BaseSchemaClass;
  currentKey: string | null; // 正在编辑的组件id
  currentEditCmp: BaseSchemaClass | null; // 正在编辑的数据
  editList: BaseSchemaClass[]; // 所有的编辑列表
  updateCurrentEditCmpValues: (newValues: any) => void; // 更新正在编辑的组件的内容
  switchEditCmp: (id: string, immediatelyCheck?: boolean) => void; // 切换编辑的组件
  addToEdit: (item: EditorData) => BaseSchemaClass; // 添加组件并编辑
  addCmp: (record: BaseSchemaClass, index?: number) => void; // 纯粹添加组件
  deleteCmp: (id: string) => void; // 删除组件
  copyCmp: (record: EditorData) => BaseSchemaClass | null; // 拷贝组件
  clearAllCmp: () => void; // 清除全部编辑组件
  updeteEditList: () => void; // 更新编辑列表
  updeteEditListItem: (record: BaseSchemaClass) => void;
  arrayMove: (
    oldIndex: number,
    newIndex: number
  ) => { oldIndex: number; newIndex: number } | null; // 更新排序
  changeModalType: (type: ModalType) => void; // 切换状态
  updatePageInfoValues: (newValues: any) => void; // 更新页面设置数据
};

class EditorClass {
  @observable modalType: ModalType = 'pageSet';
  @observable pageinfo;
  @observable currentKey: string | null = null;
  @observable currentEditCmp: BaseSchemaClass | null = null;
  @observable editList: BaseSchemaClass[] = [];
  manager!: EditorManager;
  @action.bound
  init(manager: EditorManager) {
    this.manager = manager;
    const PageClass: any = this.manager.getEditorByType('PageInfo');
    if (PageClass) {
      this.pageinfo = new PageClass();
    }
  }
  // 切换状态
  @action.bound
  changeModalType(type: ModalType) {
    if (type === 'componentList') {
      this.currentEditCmp = null;
      this.currentKey = null;
    }
    this.modalType = type;
  }

  // 更新正在编辑的组件的内容
  @action.bound
  updateCurrentEditCmpValues(newValues: any) {
    if (this.currentEditCmp) {
      this.currentEditCmp.setFieldsValue(newValues);
      // 发送消息给iframe
      this.manager.message.emit('UpdateNode', this.currentEditCmp.getData());
    }
  }

  // 更新页面设置数据
  @action.bound
  updatePageInfoValues(newValues: any) {
    this.pageinfo.values = newValues;
    // 发送消息给iframe
    this.manager.message.emit('UpdatePageInfo', this.pageinfo.getData());
  }

  // 添加组件并修改
  @action.bound
  addToEdit(item: EditorData): BaseSchemaClass {
    // 先更新当前的 list 下的数据
    // this.updeteEditList();
    const { cmpType, index } = item;
    const CmpClass: any = this.manager.getEditorByType(cmpType);
    const newItem: BaseSchemaClass = new CmpClass();
    // 关键点
    newItem.index = index;
    if (newItem.setId) {
      newItem.setId(genNonDuplicateId());
    }
    if (newItem.getInitialValue) {
      console.log('newItem.getInitialValue()', newItem.getInitialValue());
      newItem.setFieldsValue(newItem.getInitialValue());
    }
    console.log('addToEdit', newItem);
    this.currentEditCmp = newItem;
    this.currentKey = newItem.id;
    this.modalType = 'component';
    if (index != null) {
      this.editList.splice(index, 0, newItem);
    } else {
      this.editList.push(newItem);
    }
    console.log('this.editList', this.editList);
    return newItem;
  }
  // 添加组件
  @action.bound
  addCmp(item: BaseSchemaClass, index?: number) {
    if (index != null && index > -1) {
      this.editList.splice(index, 0, item);
    }
  }

  // 删除组件
  @action.bound
  deleteCmp(id: string) {
    this.editList = this.editList.filter((it) => it.id !== id);
    if (this.currentKey === id) {
      this.currentKey = null;
      this.currentEditCmp = null;
    }
    // if (noticed) {
    //   // 发送消息给iframe
    //   sendToIframe.deleteCmp(id);
    // }
  }

  // 复制组件
  @action.bound
  copyCmp(record: EditorData) {
    const cmpType = record.cmpType;
    const Clas: any = this.manager.getEditorByType(cmpType);
    if (Clas) {
      const newItem: BaseSchemaClass = new Clas();
      console.log('copyCmp');
      newItem.setFieldsValue(record.values);
      const index = this.editList.findIndex((it) => it.id === record.id);
      if (index > -1) {
        const newIndex = index + 1;
        this.editList.splice(newIndex, 0, newItem);
        return newItem;
        // if (noticed) {
        //   // 发送消息给iframe
        //   sendToIframe.copyCmp(newItem);
        // }
      }
    }
    return null;
  }

  // 清空组件
  @action.bound
  clearAllCmp() {
    this.editList = [];
    this.currentKey = null;
    this.currentEditCmp = null;
    this.manager.message.emit('ClearNodes');

    // 发送消息给iframe
    // sendToIframe.clearAllCmp();
  }

  // 切换编辑的组件
  @action.bound
  switchEditCmp(id: string, immediatelyCheck: boolean = false): void {
    // 先更新当前的 list 下的数据
    this.updeteEditList();

    const item = this.editList.find((it) => it.id === id);
    if (item) {
      this.currentKey = id;

      const Clas: any = this.manager.getEditorByType(item.cmpType);
      if (Clas) {
        const newItem: BaseSchemaClass = new Clas();
        newItem.initClass({
          ...item,
          immediatelyCheck: immediatelyCheck,
        });
        this.currentEditCmp = newItem;
        this.modalType = 'component';
      }
    }
  }

  // 把当前数据更新进编辑列表
  @action.bound
  updeteEditList() {
    if (this.currentEditCmp && this.currentKey) {
      const editCmp = cloneDeep(this.currentEditCmp);
      const index = this.editList.findIndex((it) => it.id === editCmp?.id);
      if (index !== -1) {
        this.editList.splice(index, 1, editCmp);
      }
      this.currentEditCmp = null;
      this.currentKey = null;
    }
  }

  // 更新编辑列表
  @action.bound
  updeteEditListItem(record: BaseSchemaClass) {
    if (record) {
      const editCmp = cloneDeep(record);
      const index = this.editList.findIndex((it) => it.id === record?.id);
      if (index !== -1) {
        this.editList.splice(index, 1, editCmp);
      }
    }
  }

  // 更新排序
  @action.bound
  arrayMove(oldIndex: number, newIndex: number) {
    if (oldIndex !== newIndex) {
      const editList = arrayMoveImmutable(this.editList, oldIndex, newIndex);
      this.editList = editList;
      console.log('this.editList', editList);
      return { oldIndex, newIndex };
    }

    return null;
  }
}
const editorStore: editorStoreType = new EditorClass();
export default editorStore;
