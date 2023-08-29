import { Select, SelectProps } from 'antd';
import React from 'react';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';

type VdSelectProps = SelectProps & ExtendVdFormItemProps;

const VdSelect: React.FC<VdSelectProps> = (props) => {
  const { formItem, options = [], value, onChange, block = false } = props;
  console.log('formItem', formItem);
  return (
    <VdFormItem formItem={formItem} showValue={false} block={block}>
      <Select
        options={options}
        style={{ width: '240px' }}
        value={value}
        onChange={onChange}
      ></Select>
    </VdFormItem>
  );
};

export default VdSelect;
