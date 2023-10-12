// @ts-ignore
import { ComponentSchemaProps } from '@sceditor/element';
import { iframeId } from '../index';

type PostComProps = ComponentSchemaProps & {
  index?: number;
};

const postMessage = (type: string, data: any) => {
  const frameObj = document.getElementById(iframeId) as HTMLIFrameElement;
  // const doc = frameObj.contentDocument || frameObj.contentWindow?.document;
  // let addIndex = index;
  // if (index == null) {
  //   if (doc) {
  //     const dropEle = doc?.getElementById('drop-box');
  //     const dropEleChild: ChildNode[] = [];
  //     if (dropEle) {
  //       dropEle.childNodes.forEach((item) => {
  //         if (item.nodeType === 1) {
  //           dropEleChild.push(item);
  //         }
  //       });
  //     }
  //     addIndex = dropEleChild.length;
  //   }
  // }
  // console.log('postMessage---type', type);
  if (frameObj && frameObj.contentWindow) {
    let msg = {
      type: type,
      data,
    };
    frameObj.contentWindow.postMessage(JSON.stringify(msg), '*');
  }
};
/** 页面设置 */
const updatePage = (item: PostComProps) => {
  postMessage('page', {
    cmpType: item.cmpType,
    cmpName: item.cmpName,
    values: item.values,
    id: item.id,
  });
};

const addCmp = (item: PostComProps) => {
  postMessage('add', {
    cmpKey: item.cmpKey,
    cmpName: item.cmpName,
    values: item.values,
    id: item.id,
    index: item?.index,
  });
};

const deleteCmp = (id: string) => {
  postMessage('delete', id);
};

const changeActiveCmp = (id: string) => {
  postMessage('changeActiveCmp', id);
};

const arrayMove = (oldIndex: number, newIndex: number) => {
  postMessage('arrayMove', {
    oldIndex: oldIndex,
    newIndex: newIndex,
  });
};

const updateCmp = (item: PostComProps) => {
  postMessage('update', {
    cmpType: item.cmpType,
    cmpName: item.cmpName,
    values: item.values,
    id: item.id,
  });
};
/** 复制组件 */
const copyCmp = (item: PostComProps) => {
  postMessage('copy', {
    cmpKey: item.cmpKey,
    cmpName: item.cmpName,
    values: item.values,
    id: item.id,
  });
};

const clearAllCmp = () => {
  postMessage('clear', null);
};

export default {
  addCmp,
  deleteCmp,
  copyCmp,
  changeActiveCmp,
  arrayMove,
  updateCmp,
  clearAllCmp,
  updatePage,
  postMessage,
};
