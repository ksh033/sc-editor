import Frame from './Frame';
import './index.less';
import { StoreProvider } from '../stores/index';

const Editor = (props: any) => {
  return (
    <StoreProvider>
      <Frame {...props} />
    </StoreProvider>
  );
};
export default Editor;
