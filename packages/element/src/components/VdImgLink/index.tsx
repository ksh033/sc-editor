import { Button, Input, Space } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React from 'react';
import './index.less';
// import { BsUpload } from '@micro-frame/sc-runtime';

export type VdImgLinkState = {
  image_id?: string;
  image_url?: string;
  image_thumb_url?: string;
  image_width?: number;
  image_height?: number;
  link_id?: string;
  link_type?: string;
  title?: string;
  link_url?: string;
};

export type VdImgLinkProps = {
  styleType?: 'write' | 'grep';
  needTitle?: boolean;
  needImage?: boolean;
  value?: VdImgLinkState;
  onChange?: (val: VdImgLinkState) => void;
};

const VdImgLink: React.FC<VdImgLinkProps> = (props) => {
  const { styleType = 'grep', needTitle = true, needImage = true } = props;

  const [value, setValue] = useMergedState(
    {},
    {
      value: props.value,
      onChange: props.onChange,
    }
  );

  const styleTypeMap = {
    write: {
      backgroundColor: '#ffffff',
    },
    grep: {
      backgroundColor: '#f7f8fa',
    },
  };

  const onUploadChange = (val: any) => {
    const newVal = value || {};
    setValue({
      ...newVal,
      image_id: val.fileId,
      image_url: val.url,
      image_thumb_url: val.thumb_url,
      image_width: val.width,
      image_height: val.height,
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = value || {};
    const title = e.target.value;
    if (typeof title === 'string') {
      setValue({
        ...newVal,
        title: title,
      });
    }
  };

  return (
    <div
      className="vd-img-link-warp"
      style={{ backgroundColor: styleTypeMap[styleType].backgroundColor }}
    >
      {needImage ? (
        <div className="has-choosed-image">
          <img src={value?.image_url} className="vd-link-image"></img>
        </div>
      ) : null}

      <div className="vd-img-link-warp-content">
        <Space direction="vertical">
          {needTitle ? (
            <Space align="center">
              <span>标题</span>
              <Input onChange={onInputChange} value={value?.title}></Input>
            </Space>
          ) : null}

          <Space align="center">
            <span>链接</span>
            <Button type="link">选择跳转到的页面</Button>
          </Space>
        </Space>
      </div>
    </div>
  );
};

export default VdImgLink;
