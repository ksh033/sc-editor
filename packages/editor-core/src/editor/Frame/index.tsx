import { observer, useObserver } from 'mobx-react-lite';
import React, { useLayoutEffect,useRef } from 'react';
import './index.less';

import { useStore } from '../../stores';
import ComsPanel from '../ComsPanel';
import PreView from '../PreView';
import PropertyPanel from '../PropertyPanel';
import TopBar from '../TopBar';
import {EditorContext,EditorManager} from '../../manager'

type FrameProps = {
  iframeUrl?: string;
};

const Frame: React.FC<FrameProps> = (props) => {
  const { previewStore,comsStore,editorStore } = useStore();

  const ref= useRef<EditorManager>()
  useLayoutEffect(() => {
    if (props?.iframeUrl) {
      previewStore.initIframeUrl(props?.iframeUrl);
    }
    ref.current=new EditorManager()
    //comsStore.init(ref.current)
   // editorStore.init(ref.current)
  }, [props?.iframeUrl]);

  return useObserver(() => (
   <EditorContext.Provider value={{manager:ref.current?}}>
    <div className="editor-wrapper">
      <TopBar></TopBar>
      <div className="editor-wrapper-contnet">
        <ComsPanel></ComsPanel>
        <PreView></PreView>
        <PropertyPanel></PropertyPanel>
      </div>
    </div>
    </EditorContext.Provider>
  ));
};

export default observer(Frame);
