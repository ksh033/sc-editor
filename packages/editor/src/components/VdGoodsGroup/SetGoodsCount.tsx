import { Input, InputNumber, Radio, RadioChangeEvent, Space } from 'antd';
import React from 'react';

type SetGoodsCountValueType = {
  isShowAll: boolean;
  goods_number?: number;
};

type SetGoodsCountProps = {
  value?: SetGoodsCountValueType;
  onChange?: (val: SetGoodsCountValueType) => void;
};

const SetGoodsCount: React.FC<SetGoodsCountProps> = (props) => {
  const { value, onChange } = props;

  const onHandleChange = (e: RadioChangeEvent) => {
    onChange?.({
      isShowAll: e.target.value,
      goods_number: void 0,
    });
  };

  const onHandleInputChange = (num: any) => {
    onChange?.({
      isShowAll: value?.isShowAll || false,
      goods_number: num,
    });
  };

  return (
    <Radio.Group onChange={onHandleChange} value={props.value?.isShowAll}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Radio value={false}>
          <Space align="center">
            <InputNumber
              style={{ width: 100, marginLeft: 4 }}
              placeholder="自定义"
              controls={false}
              value={value?.goods_number}
              max={100}
              onChange={onHandleInputChange}
              parser={(text) => (/^\d+$/.test(text || '') ? Number(text) : 0)}
            />
            <span>个</span>
          </Space>
        </Radio>
        <Radio value={true}>全部</Radio>
      </div>
    </Radio.Group>
  );
};

export default SetGoodsCount;
