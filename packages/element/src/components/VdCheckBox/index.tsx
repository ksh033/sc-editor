import { Checkbox, CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import React from 'react';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';

type VdRadioIconProps = Omit<CheckboxProps, 'onChange'> &
  ExtendVdFormItemProps & {
    valueMap?: Record<string, React.ReactNode>;
    onChange?: (val: boolean) => void;
    renderMsg?: () => React.ReactNode;
  };

const defaultValueMap: Record<string, React.ReactNode> = {
  '1': '显示',
  '0': '不显示',
};

const VdCheckBox: React.FC<VdRadioIconProps> = (props) => {
  const {
    onChange,
    value,
    formItem,
    valueMap = defaultValueMap,
    block = false,
    renderMsg,
  } = props;

  const handleChange = (e: CheckboxChangeEvent) => {
    onChange?.(e.target.checked);
  };

  return (
    <>
      <VdFormItem
        formItem={formItem}
        valueName={valueMap[value === true ? '1' : '0']}
        block={block}
      >
        <Checkbox onChange={handleChange} checked={Boolean(value)}></Checkbox>
      </VdFormItem>
      {renderMsg && renderMsg()}
    </>
  );
};

export default VdCheckBox;
