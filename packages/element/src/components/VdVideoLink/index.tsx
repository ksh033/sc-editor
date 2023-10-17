import type { InputProps } from 'antd';
import { Input } from 'antd';
import './index.less';
import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';

type VdVideoLayoutProps = InputProps & {
  info?: string;
};

const VdVideoLayout: EditorPropertyComponent<VdVideoLayoutProps> = (props) => {
  const {
    value,
    onChange,
    info = '小程序 v2.15 及以上版本支持仅支持.mp4格式的视频源地址',
  } = props;

  return (
    <div className="vd-video-link">
      <Input
        placeholder="请输入视频地址"
        value={value as string}
        onChange={onChange}
      ></Input>
      {info && <div className="vd-video-link-info">{info}</div>}
      <div className="vd-video-link-video">
        <video
          enable-progress-gesture={false}
          controls
          autoPlay
          id="linkVideo"
          src={`${value || ''}`}
        >
          <source src={`${value || ''}`} type="video/mp4"></source>
        </video>
      </div>
    </div>
  );
};
VdVideoLayout.valueType="VdVideoLayout"
registerEditorAttrCmp(VdVideoLayout)
export default VdVideoLayout;
