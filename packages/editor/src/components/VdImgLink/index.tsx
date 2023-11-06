import { Button, Input, Space } from 'antd';
import VdSelectImage from '../VdSelectImage';
import './index.less';
import { VdImgLinkProps } from './type';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';
import VdSelectJumpLink from '../VdSelectJumpLink';

const VdImgLink: SysEditorPropertyComponent<VdImgLinkProps> = (props) => {
  const { value, onChange } = props;

  const onUploadChange = (val: any) => {
    const newVal = value || {};
    onChange?.({
      ...newVal,
      ...val,
    });
  };

  return (
    <div className="vd-img-link">
      <div className="vd-img-link-choosed-image">
        <VdSelectImage value={value} onChange={onUploadChange}></VdSelectImage>
      </div>
      <div className="vd-img-link-content">
        <Space direction="vertical" className="vd-img-link-space">
          <span className="tag-item-warp-label">链接设置</span>
          <Input placeholder="图片提示信息(非必填)"></Input>
          {/* 链接跳转 */}
          <VdSelectJumpLink></VdSelectJumpLink>
        </Space>
      </div>
    </div>
  );
};
VdImgLink.valueType = 'VdImgLink';
registerEditorAttrCmp(VdImgLink);
export default VdImgLink;
