import { CopyOutlined, HomeOutlined } from '@ant-design/icons';
import { useEventListener } from 'ahooks';
import { Button } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { iframeId } from '../../index';
import { useStore } from '../../stores';
import { ModalType } from '../../stores/editor';
import Drag from '../../utils/drag';
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

  useEventListener('message', (event: any) => {
    console.log('parent-receive-message', event);
    let data: any = null;
    if (typeof event.data === 'string') {
      data = JSON.parse(event.data);
      if (data.type === 'changeActive') {
        editorStore.switchEditCmp(data.data);
      }
      if (data.type === 'changeHeight') {
        setHeight(data.data);
      }
      if (data.type === 'delete') {
        const flag = comsStore.minusComsNum(data.data.cmpKey);
        if (flag) {
          editorStore.deleteCmp(data.data.id, false);
        }
      }
      if (data.type === 'arrayMove') {
        editorStore.arrayMove(data.data.oldIndex, data.data.newIndex, false);
      }
      if (data.type === 'copy') {
        const { index, ...restItem } = data.data;
        const flag = comsStore.addComsNum(data.data.cmpKey);
        if (flag) {
          editorStore.addCmp(restItem, index);
        }
      }
    }
  });

  const callback = (params: any) => {
    if (params.type === 'add' || params.type === 'insert') {
      if (params.cmpKey) {
        const item = comsStore.getCompByKey(params.cmpKey);
        if (item) {
          const flag = comsStore.addComsNum(params.cmpKey);
          if (flag) {
            editorStore.addToEdit(item, params.index);
          }
        }
      }
    }
  };

  const init = () => {
    const item: HTMLCollectionOf<HTMLElement> = document.getElementsByClassName(
      'drag-item'
    ) as HTMLCollectionOf<HTMLElement>;
    console.log('item', item);
    const iframe = document.getElementById(iframeId) as HTMLIFrameElement;

    const iframeDocument =
      iframe.contentDocument || iframe.contentWindow?.document;

    Drag.init({
      iframeEle: iframe,
      dragEle: document.getElementById('drag-box'),
      dragItem: item,
      callback,
      dropEle: iframeDocument?.getElementById('drop-box'),
      dropEleItems: iframeDocument?.getElementsByClassName(
        'drop-item'
      ) as HTMLCollectionOf<HTMLElement>,
    });
  };
  useIframeLoad();

  useEffect(() => {
    if (contentIFrameRef.current) {
      setTimeout(() => {
        init();
      }, 100);
    }
  }, [contentIFrameRef.current]);

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
      <div className="preview drop-content">
        <iframe
          ref={contentIFrameRef}
          id={iframeId}
          src={previewStore.iframeUrl}
          // sandbox="allow-scripts allow-same-origin allow-top-navigation allow-forms"
          scrolling="auto"
          style={{
            width: '100%',
            border: 'none',
            height: height + 'px',
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
