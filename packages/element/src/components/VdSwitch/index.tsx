import type { SwitchProps } from 'antd';
import { Switch } from 'antd';
import React from 'react';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';

type VdSwitchProps = SwitchProps &
  ExtendVdFormItemProps & {
    value?: boolean;
    valueMap?: Record<any, React.ReactNode | string>;
  };

const defaultValueMap = {
  true: '显示',
  false: '不显示',
};

const VdSwitch: React.FC<VdSwitchProps> = (props) => {
  const {
    formItem,
    value = false,
    onChange,
    block = false,
    valueMap = defaultValueMap,
  } = props;
  console.log('formItem', formItem);
  return (
    <VdFormItem
      formItem={formItem}
      valueName={valueMap[`${value}`]}
      block={block}
    >
      <Switch size="small" checked={value} onChange={onChange}></Switch>
    </VdFormItem>
  );
};

export default VdSwitch;
