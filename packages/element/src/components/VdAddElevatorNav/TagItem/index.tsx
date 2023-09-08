import { useUpdateEffect } from 'ahooks';
import { Button, Input, Select, Space, Switch } from 'antd';
import type { DefaultOptionType } from 'antd/es/select';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import React, { useState } from 'react';
import type { SubEntryItem } from '../index';
import './index.less';

export type TagItemProps = {
  type?: 'text' | 'imageText' | 'image';
  value?: SubEntryItem;
  onChange?: (val: SubEntryItem) => void;
  options?: DefaultOptionType[];
};

const TagItem: React.FC<TagItemProps> = (props) => {
  const { type = 'text', options = [] } = props;

  const [value, setValue] = useMergedState<SubEntryItem>(
    {},
    {
      value: props.value,
      onChange: props.onChange,
    }
  );
  const [switchVal, setSwitchVal] = useState<boolean>(
    Boolean(value?.useLink) || false
  );

  useUpdateEffect(() => {
    setSwitchVal(Boolean(value?.useLink) || false);
  }, [value?.useLink]);

  const onUploadChange = (val: any) => {
    const newVal = value || {};
    setValue({
      ...newVal,
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = value || {};
    const title = e.target.value;
    if (typeof title === 'string') {
      console.log({
        ...newVal,
        title: title,
      });
      setValue({
        ...newVal,
        title: title,
      });
    }
  };

  const onPositionComponent = (val: string) => {
    const newVal = value || {};
    setValue({
      ...newVal,
      cmpId: val,
    });
  };

  const onSwitchValChange = (val: boolean) => {
    const newVal = value || {};
    setValue({
      ...newVal,
      useLink: val,
    });
  };

  return (
    <div className="tag-item-warp">
      {type === 'image' || type === 'imageText' ? (
        <div className="has-choosed-image">
          <img src={value?.imageUrl} className="tag-item-image"></img>
        </div>
      ) : null}

      <div className="tag-item-warp-content">
        <Space direction="vertical" className="tag-item-warp-space">
          {type === 'image' ? (
            <div className="tag-item-link">
              <div className="tag-item-link-title">切换为跳转链接</div>
              <Switch
                size="small"
                onChange={onSwitchValChange}
                checked={switchVal}
              />
            </div>
          ) : (
            <Space align="center" className="tag-item-warp-space">
              <span className="tag-item-warp-label">标签</span>
              <Input
                onChange={onInputChange}
                value={value?.title}
                className="tag-item-cmp"
              ></Input>
            </Space>
          )}
          {switchVal ? (
            <Space align="center" className="tag-item-warp-space">
              <span className="tag-item-warp-label">链接</span>
              <Button type="link">选择跳转到页面</Button>
            </Space>
          ) : (
            <Space align="center" className="tag-item-warp-space">
              <span className="tag-item-warp-label">定位</span>
              <Select
                className="tag-item-cmp"
                onChange={onPositionComponent}
                value={value?.cmpId}
                options={options}
                allowClear
              ></Select>
            </Space>
          )}
        </Space>
      </div>
    </div>
  );
};

export default TagItem;
