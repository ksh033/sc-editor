import { action, observable } from 'mobx';
// @ts-ignore
import { BaseCompGroup, BaseCompMap, CmpInfo } from '@sceditor/element';
// @ts-ignore
import type { ClassType, CompsGroup } from '@sceditor/element';
import { message } from 'antd';

export type comsStoreType = {
  comsList: CompsGroup[]; // 组件列表
  comsMap: Map<String, ClassType>; // 组件map
  comsInfoMap: Map<String, CmpInfo>; // 组件map
  getCompByKey: (key: string) => ClassType | null; // 通过组件key获取组件
  getCompInfoByKey: (key: string) => CmpInfo | undefined; // 通过组件key获取组件
  initComsInfoMap: () => void; // 初始化组件
  /**
   * 更新list的数据
   * @param cmpType  组件的key
   * @param num 跟新使用的数量
   * @returns
   */
  updateList: (cmpType: string, num: number) => void;
  /**
   * 更新分组actived的数据
   * @param id  组 id
   * @param avtived 是否展开
   * @returns
   */
  updateTabActived: (id: string, avtived: boolean) => void;
  addComsNum: (cmpType: string) => boolean; // 添加组件数量
  minusComsNum: (cmpType: string) => boolean; // 减组件数量
  clearNum: () => void; // 清空数量
};

class ComsClass {
  @observable comsList = BaseCompGroup;
  @observable comsMap = BaseCompMap;
  @observable comsInfoMap = new Map<String, CmpInfo>();

  /**
   * 初始化组件
   */
  constructor() {
    this.initComsInfoMap();
  }

  @action.bound
  initComsInfoMap() {
    const map = new Map<String, CmpInfo>();
    this.comsList.forEach((it: CompsGroup) => {
      if (Array.isArray(it.list)) {
        it.list.forEach((itm: CmpInfo) => {
          map.set(itm.cmpType, itm);
        });
      }
    });
    this.comsInfoMap = map;
  }

  // 通过组件key获取组件
  @action.bound
  getCompByKey(key: string): ClassType | null {
    const clas: any = this.comsMap.get(key);
    return clas || null;
  }

  // 通过组件key获取组件
  @action.bound
  getCompInfoByKey(key: string): CmpInfo | undefined {
    return this.comsInfoMap.get(key);
  }

  @action.bound
  updateList(cmpType: string, num: number) {
    this.comsList.forEach((item: CompsGroup) => {
      item.list.forEach((it: CmpInfo) => {
        if (it.cmpType === cmpType && it) {
          it.usedNum = num;
        }
      });
    });
  }
  @action.bound
  updateTabActived(id: string, avtived: boolean) {
    this.comsList.forEach((item: CompsGroup) => {
      if (item.id === id) {
        item.actived = avtived;
      }
    });
  }

  // 添加组件数量
  @action.bound
  addComsNum(cmpType: string) {
    const itemCom = this.getCompInfoByKey(cmpType);
    if (itemCom) {
      const newItem = itemCom;
      const usedNum = newItem.usedNum || 0;
      const maxNum = newItem.maxNum || 100000;
      const num = usedNum + 1;
      if (num <= maxNum) {
        newItem.usedNum = num;
        this.comsInfoMap.set(cmpType, newItem);
        this.updateList(cmpType, num);
        return true;
      } else {
        message.warning('该组件已添加至上限');
        return false;
      }
    } else {
      console.warn('未找到 '.concat(cmpType, ' 对应的组件模块'), cmpType);
      return false;
    }
  }
  // 减组件数量
  @action.bound
  minusComsNum(cmpType: string) {
    const itemCom = this.getCompInfoByKey(cmpType);
    if (itemCom) {
      const newItem = itemCom;
      const usedNum = newItem.usedNum || 0;
      const num = usedNum - 1;
      if (num >= 0) {
        newItem.usedNum = num;
        this.comsInfoMap.set(cmpType, newItem);
        this.updateList(cmpType, num);
        return true;
      }
      return false;
    } else {
      console.warn('未找到 '.concat(cmpType, ' 对应的组件模块'), cmpType);
      return false;
    }
  }
  // 清空数量
  clearNum() {
    this.comsList = this.comsList.map((item: CompsGroup) => {
      item.list = item.list.map((it: CmpInfo) => {
        if (it) {
          it.usedNum = 0;
        }
        return it;
      });
      return item;
    });
    this.initComsInfoMap();
  }
}
const comsStore: comsStoreType = new ComsClass();
export default comsStore;
