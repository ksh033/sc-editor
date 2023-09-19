import { Button, Space } from 'antd';
import React from 'react';
import VdSelectImage from '../VdSelectImage';
import './index.less';
import { VdImgLinkProps } from './type';

const VdImgLink: React.FC<VdImgLinkProps> = (props) => {
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
          <span className="tag-item-warp-label">链接</span>
          <Button type="link">选择跳转到页面</Button>
        </Space>
      </div>
    </div>
  );
};

export default VdImgLink;
