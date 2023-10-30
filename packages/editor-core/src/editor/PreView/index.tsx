import { CopyOutlined, HomeOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../stores';
import { ModalType } from '../../stores/editor';
import { iframeId } from '../../manager';
import './index.less';
import useIframeLoad from './useIframeLoad';

const defaultHeight = 750;

const PreView: React.FC<any> = () => {
  const { comsStore, editorStore, previewStore } = useStore();
  const contentIFrameRef = useRef<HTMLIFrameElement>(null);
  const modalType = editorStore.modalType;
  const [height, setHeight] = useState<Number>(defaultHeight);

  const handleClick = (type: ModalType) => {
    editorStore.changeModalType(type);
  };

  // 监听iframne是否加载的hook
  useIframeLoad();

  // // 监听来自iframe的消息
  // useEventListener('message', (event: any) => {
  //   let data: any = null;
  //   const rect = contentIFrameRef.current?.getBoundingClientRect();
  //   if (event.data) {
  //     data = event.data;
  //     if (data.type === 'add') {
  //       const item = comsStore.getCompByKey(data.data.cmpType);
  //       if (item) {
  //         const flag = comsStore.addComsNum(data.data.cmpType);
  //         if (flag) {
  //           editorStore.addToEdit(item, data.data.index);
  //         }
  //       }
  //     }
  //     if (data.type === 'changeActive') {
  //       editorStore.switchEditCmp(data.data);
  //     }
  //     if (data.type === 'changeHeight') {
  //       setHeight(data.data);
  //     }
  //     if (data.type === 'delete') {
  //       const flag = comsStore.minusComsNum(data.data.cmpType);
  //       if (flag) {
  //         editorStore.deleteCmp(data.data.id, false);
  //       }
  //     }
  //     if (data.type === 'arrayMove') {
  //       editorStore.arrayMove(data.data.oldIndex, data.data.newIndex, false);
  //     }
  //     if (data.type === 'copy') {
  //       const { index, ...restItem } = data.data;
  //       const flag = comsStore.addComsNum(data.data.cmpType);
  //       if (flag) {
  //         editorStore.addCmp(restItem, index);
  //       }
  //     }
  //   }
  //   if (event.data.type == 'mousemove') {
  //     // console.log();
  //     let pos = {
  //       clientX: event.data.data.clientX + Number(rect?.left || 0),
  //       clientY: event.data.data.clientY + Number(rect?.top || 0),
  //     };

  //     document.dispatchEvent(new MouseEvent('mousemove', pos));
  //   } else if (event.data.type === 'mouseup') {
  //     let pos = {
  //       clientX: event.data.data.clientX + Number(rect?.left || 0),
  //       clientY: event.data.data.clientY + Number(rect?.top || 0),
  //     };

  //     document.dispatchEvent(new MouseEvent('mouseup', pos));
  //   }
  // });

  // const callback = (params: any) => {
  //   if (params.type === 'add' || params.type === 'insert') {
  //     if (params.cmpType) {
  //       const item = comsStore.getCompByKey(params.cmpType);
  //       if (item) {
  //         const flag = comsStore.addComsNum(params.cmpType);
  //         if (flag) {
  //           editorStore.addToEdit(item, params.index);
  //         }
  //       }
  //     }
  //   }
  // };

  // const init = () => {
  //   const item: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName(
  //     'drag-item'
  //   ) as HTMLCollectionOf<HTMLElement>;
  //   const iframe = document.getElementById(iframeId) as HTMLIFrameElement;
  //   iframe.onload = function () {
  //     console.log('加载成功回调');
  //     const iframeDocument =
  //       iframe.contentDocument || iframe.contentWindow?.document;
  //     setTimeout(() => {
  //       Drag.init({
  //         iframeEle: iframe,
  //         dragEle: document.getElementById('drag-box'),
  //         dragItem: item,
  //         callback,
  //         dropEle: iframeDocument?.getElementById('drop-box'),
  //         dropEleItems: iframeDocument?.getElementsByClassName(
  //           'drop-item'
  //         ) as HTMLCollectionOf<HTMLElement>,
  //       });

  //       // 初始化后先发送页面配置数据
  //       const pageCmp = editorStore.pageinfo;
  //       if (pageCmp) {
  //         sendToIframe.updatePage(pageCmp);
  //       }
  //     }, 100);
  //     console.log('iframeDocument', iframeDocument?.getElementById('drop-box'));
  //   };
  // };

  // useEffect(() => {
  //   if (contentIFrameRef.current) {
  //     init();
  //   }
  // }, [contentIFrameRef.current]);

  return (
    <div className="preview-wrap">
      <div className="preview-page">
        <Button
          type={modalType === 'pageSet' ? 'primary' : 'default'}
          icon={<HomeOutlined />}
          className="preview-page-options"
          onClick={() => {
            handleClick('pageSet');
          }}
        >
          页面设置
        </Button>
        <Button
          type={modalType === 'componentList' ? 'primary' : 'default'}
          icon={<CopyOutlined />}
          className="preview-page-options"
          onClick={() => {
            handleClick('componentList');
          }}
        >
          组件管理
        </Button>
      </div>
      <div
        className="preview drop-content"
        onMouseMove={(event) => {
          event.stopPropagation();
          event.cancelable = false;
        }}
      >
        <iframe
          ref={contentIFrameRef}
          id={iframeId}
          src={previewStore.iframeUrl}
          // sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture full"
          scrolling="auto"
          style={{
            width: '100%',
            border: 'none',
            height: '100%',
          }}
        ></iframe>
        {/* <div className="preview-head">
          <div className="preview-header-title">
            {editorStore.pageinfo?.values.pageName}
          </div>
        </div>
        <div className="preview-content drop-content">
          
        </div>
        <div className="preview-footer">
          <div>博耕科技支持</div>
        </div> */}
      </div>
    </div>
  );
};
export default observer(PreView);
