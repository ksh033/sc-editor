import { ProFieldFCRenderProps, ProRenderFieldPropsType } from "@ant-design/pro-provider";
import React, { useContext } from "react";
import { BaseSchemaClass,  AbsBaseSchemaClass,  EditorPropertyComponent, EditorData, EditorPropertyHoc } from "./design"
import { SysComponents, IframePostMessage } from '@sceditor/cmp-center'
// iframeId 页面的id
const iframeId = 'myFrame';
export { iframeId };

import { StoreType } from './stores'

const builtEditors: Record<string, AbsBaseSchemaClass> = {}
const valueTypeMap: Record<string, ProRenderFieldPropsType> = {};
/**
 * 注册设计器组件
 * @param klass 
 */
export function registerEditor(klass: AbsBaseSchemaClass) {

  if (!builtEditors[klass.info.cmpType]) {
    /// klass.prototype.cmpName=klass.info.name
    // klass.prototype.cmpType=klass.info.cmpType
    // klass.prototype.
    const editorClass = class extends klass {
      cmpType = klass.info.cmpType;
      cmpName = klass.info.name
    };
    builtEditors[klass.info.cmpType] = editorClass
  }
}

/**
 * 
 * @param klass 编辑器属性控件
 * @param valueType 
 */
export function registerEditorAttrCmp(klass: EditorPropertyComponent<any>, valueType?: string) {
  const type = klass.valueType || valueType
  if (type && !valueTypeMap[type]) {
    valueTypeMap[type] = {
      renderFormItem: (_text: any, props: ProFieldFCRenderProps, _dom: JSX.Element) => {
        //const editorValue = useContext(EditorContext)
        const  EditorPropertyCmp=EditorPropertyHoc(klass)
        return React.createElement(EditorPropertyCmp, { ...props, ...props?.fieldProps })
      }
    }
  }
}






export interface EditorManagerConfig {

  iframeElem: HTMLIFrameElement
  originUrl?
}
/**
 * 在 component/Editor.tsx 里面实例化的。
 * 辅助 component/Editor.tsx 实现一些非 UI 相关的功能。
 */
export class EditorManager {
  public readonly message!: IframePostMessage;
  public readonly stroe!: StoreType
  private iframeElem: HTMLIFrameElement;
  constructor(readonly config: EditorManagerConfig, store: StoreType) {
    this.stroe = store
    this.iframeElem = config.iframeElem
    this.message = new IframePostMessage(this.iframeElem.contentWindow as Window, config.originUrl)


    this.stroe.comsStore.init(this)
    this.stroe.editorStore.init(this)

    this.message.on('InsterNode', this.insterNode.bind(this))
    this.message.on('ChangeActiveNode', this.changeActiveNode.bind(this))
    this.message.on('DeleteNode', (msgData)=>{
      this.deleteNode(msgData,false)
    })
    this.message.on('CopyNode',this.copyNode.bind(this))
    this.message.on('MoveNode', (msgData) => {
        this.moveNode(msgData,false)
    })

    this.message.on('MouseMove', (msgData) => {
      const rect = this.iframeElem.getBoundingClientRect()
      let pos = {
        clientX: msgData.clientX + Number(rect?.left || 0),
        clientY: msgData.clientY + Number(rect?.top || 0),
      };

   

      document.dispatchEvent(new MouseEvent('mousemove', pos));


    })
    this.message.on('MouseUp', (msgData) => {
      const rect = this.iframeElem.getBoundingClientRect()
      let pos = {
        clientX: msgData.clientX + Number(rect?.left || 0),
        clientY: msgData.clientY + Number(rect?.top || 0),
      };

      document.dispatchEvent(new MouseEvent('mouseup', pos));

    })
  }

  //获取编辑器MAp
  getEditorsMap() {
    return builtEditors;
  }
  /**
   * 根据类型获取编辑器控件
   * @param cmpType 
   */
  getEditorByType(cmpType: string);
  getEditorByType(cmpType: keyof typeof SysComponents);
  getEditorByType(cmpType) {
    return builtEditors[cmpType]
  }
  changeActiveNode(id:string){
    this.stroe.editorStore.switchEditCmp(id);
  }
  insterNode(editorData: Omit<EditorData, 'cmpType' | "values" | "id"> & { cmpType: keyof typeof SysComponents },noticed?:boolean);
  insterNode(editorData: Omit<EditorData, "values" | "id" | 'cmpType'> & { cmpType: string },noticed?:boolean);
  insterNode(editorData,noticed=true) {

    console.log(this)
    const { cmpType } = editorData
    const item = this.getEditorByType(cmpType);
    if (item) {
      const flag = this.stroe.comsStore.addComsNum(cmpType);
      if (flag) {
        const newItme = this.stroe.editorStore.addToEdit(editorData);
        if (newItme&&noticed) {
          this.message.emit('InsterNode', newItme.getData())
        }
      }
    }
  }
  deleteNode(editorData:EditorData,noticed?:boolean);
  deleteNode(editorData,noticed=true) {
    const flag = this.stroe.comsStore.minusComsNum(editorData.cmpType);
    if (flag) {
      this.stroe.editorStore.deleteCmp(editorData.id);
      if (noticed){
        this.message.emit('DeleteNode', editorData.id)
      }
    
    }
  }
  createNode(cmpType: string): BaseSchemaClass;
  createNode(cmpType: keyof typeof SysComponents): BaseSchemaClass;
  createNode(cmpType) {
    const item = this.getEditorByType(cmpType);
    if (item) {
      const newItem: BaseSchemaClass = new item();


      return newItem
    }
    return null

  }
  copyNode(editorData:EditorData,noticed?:boolean);
  copyNode(editorData: EditorData,noticed=true){
    const { cmpType } = editorData;
     const flag = this.stroe.comsStore.addComsNum(cmpType);
    if (flag) {
      const copyClass=this.stroe.editorStore.copyCmp(editorData);
      if (copyClass&&noticed){
        this.message.emit('CopyNode',copyClass.getData())
      }
    }
  }
  moveNode(data:{oldIndex:number,newIndex:boolean},noticed?:boolean);
  moveNode({oldIndex,newIndex},noticed=true){
     const newPos=this.stroe.editorStore.arrayMove(oldIndex, newIndex);

     if (noticed&&newPos){
      this.message.emit('MoveNode',newPos)
     }

  }
  /**
   * 获取编辑器属性控件
   * @returns 
   */
  getEditorPropertyComponentMap() {
    return valueTypeMap
  }

  //sendMessage("")


}
const initData: any = {}
/* Creating a context object with the default values. */
export const EditorContext = React.createContext<{ manager: EditorManager }>(initData);
