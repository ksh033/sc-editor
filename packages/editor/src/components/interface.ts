import { EditorPropertyComponent } from '@sceditor/editor-core';
export enum SysValueTypesEnum {
  VdRadioIcon = 'VdRadioIcon',
  VdColor = 'VdColor',
  VdTabs = 'VdTabs',
  VdSlider = 'VdSlider',
  VdMagicCubeLayout = 'VdMagicCubeLayout',
  VdCheckBox = 'VdCheckBox',
  VdRadioGroup = 'VdRadioGroup',
  VdGoodsList = 'VdGoodsList',
  VdGoodsGroup = 'VdGoodsGroup',
  VdAddList = 'VdAddList',
  VdSelect = 'VdSelect',
  VdCouponSet = 'VdCouponSet',
  VdColorRadioGroup = 'VdColorRadioGroup',
  VdSwitch = 'VdSwitch',
  VdUpload = 'VdUpload',
  VdVideoLink = 'VdVideoLink',
  VdAddElevatorNav = 'VdAddElevatorNav',
  VdAddImageList = 'VdAddImageList',
  VdImgLink = 'VdImgLink',
  VdVideoLayout = 'VdVideoLayout',
  VdSelectBuyBtnStyle = 'VdSelectBuyBtnStyle',
  VdIcon = 'VdIcon',
  VdSelectJumpLink = 'VdSelectJumpLink',
  VdGoodsProperty = 'VdGoodsProperty',
  VdSelectCoupon = 'VdSelectCoupon',
}
export type SysValueTypes = keyof typeof SysValueTypesEnum;
export type SysEditorPropertyComponent<P> = EditorPropertyComponent<
  P,
  SysValueTypes
>;
