import { observer, useObserver } from 'mobx-react-lite';
import React, { useLayoutEffect, useRef, useState } from 'react';
import './index.less';

import { useStore } from '../../stores';
import ComsPanel from '../ComsPanel';
import PreView from '../PreView';
import PropertyPanel from '../PropertyPanel';
import TopBar from '../TopBar';
import { EditorContext, EditorManager, iframeId } from '../../manager';

type FrameProps = {
  iframeUrl?: string;
};

const Frame: React.FC<FrameProps> = (props) => {
  const store = useStore();
  const [_init, setInit] = useState<boolean>(false);
  const ref = useRef<EditorManager>();
  useLayoutEffect(() => {
    if (props?.iframeUrl) {
      store.previewStore.initIframeUrl(props?.iframeUrl);
    }
    ref.current = new EditorManager(
      {
        iframeElem: document.getElementById(iframeId) as HTMLIFrameElement,
      },
      store
    );
    setInit(true);
    //comsStore.init(ref.current)
    // editorStore.init(ref.current)
  }, []);

  return useObserver(() => (
    <EditorContext.Provider value={{ manager: ref.current as any }}>
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
