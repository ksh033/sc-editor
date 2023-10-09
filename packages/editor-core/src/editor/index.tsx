import Frame from './Frame';
import './index.less';
import { StoreProvider } from '../stores/index';

// iframeId 页面的id
const iframeId = 'myFrame';
export { iframeId };

const Editor = (props: any) => {
  return (
    <StoreProvider>
      <Frame {...props} />
    </StoreProvider>
  );
};
export default Editor;
