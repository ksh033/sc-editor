import { BaseFromItemProps } from '@sceditor/core';
import type { ExtendVdFormItemProps } from '../VdFormItem';
export type BtnType =
  | 'cart1'
  | 'cart2'
  | 'hollow'
  | 'fill'
  | 'circle-fill'
  | 'square-fill'
  | 'circle-hollow'
  | 'square-hollow'
  | 'none';

export type ItemType = {
  icon?: string;
  label?: string | React.ReactNode;
  key: string;
  btnText?: string;
};
export type VdSelectBuyBtn = {
  btnType: BtnType;
  btnText?: string;
};

export type VdSelectBuyBtnStyleProps = ExtendVdFormItemProps &
  BaseFromItemProps<VdSelectBuyBtn>;
