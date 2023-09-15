import { observer, useObserver } from 'mobx-react-lite';
import React, { useLayoutEffect } from 'react';
import './index.less';

import { useStore } from '../../stores';
import ComsPanel from '../ComsPanel';
import PreView from '../PreView';
import PropertyPanel from '../PropertyPanel';
import TopBar from '../TopBar';

type FrameProps = {
  iframeUrl?: string;
};

const Frame: React.FC<FrameProps> = (props) => {
  const { previewStore } = useStore();

  useLayoutEffect(() => {
    if (props?.iframeUrl) {
      previewStore.initIframeUrl(props?.iframeUrl);
    }
  }, []);

  return useObserver(() => (
    <div className="editor-wrapper">
      <TopBar></TopBar>
      <div className="editor-wrapper-contnet">
        <ComsPanel></ComsPanel>
        <PreView></PreView>
        <PropertyPanel></PropertyPanel>
      </div>
    </div>
  ));
};

export default observer(Frame);
