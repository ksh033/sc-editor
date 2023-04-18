import { Checkbox, CheckboxProps } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';
import _ from 'lodash';
import React, { PropsWithChildren } from 'react';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';

type VdRadioIconProps = Omit<CheckboxProps, 'onChange'> &
  ExtendVdFormItemProps & {
    valueMap?: Record<any, string>;
    onChange?: (val: string) => void;
    renderMsg?: () => React.ReactNode;
  };

const defaultValueMap = {
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
    onChange?.(e.target.checked ? '1' : '0');
  };

  return (
    <>
      <VdFormItem formItem={formItem} valueName={valueMap[value]} block={block}>
        <Checkbox
          onChange={handleChange}
          checked={Boolean(value === '1')}
        ></Checkbox>
      </VdFormItem>
      {renderMsg && renderMsg()}
    </>
  );
};

export default VdCheckBox;
