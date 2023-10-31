import {
  setSchemaTpl as setSysSchemaTpl,
  getSchemaTpl as getSysSchemaTpl,
} from '@sceditor/editor-core';
import { VdProFormColumnsType } from '../interface';

export type TplType<T> =
  | VdProFormColumnsType<T>
  | ((patch?: object, options?: object) => VdProFormColumnsType);
enum TplNameEnum {
  color = 'color',
  /**
   * 选择颜色
   */
  date = 'date',
  /**
   * 填充
   */
  fill = 'fill',
  /**
   * 字体大小
   */
  fontSize = 'fontSize',
  /**
   * 字体粗细
   */
  fontWeight = 'fontWeight',
  /**
   * 顶部菜单 或 左侧菜单
   */
  tagListTemplate = 'tagListTemplate',
  /**
   * 是否全部
   */
  needAll = 'needAll',
  /**
   * 显示位置
   */
  location = 'location',
}
export type TplNames = keyof typeof TplNameEnum;
export const setSchemaTpl = function <T = any>(
  name: TplNames,
  value: TplType<T>
) {
  setSysSchemaTpl<TplNames, TplType<T>>(name, value);
};
export const getSchemaTpl = (
  name: TplNames,
  patch?: VdProFormColumnsType,
  options?: any
): VdProFormColumnsType => {
  return getSysSchemaTpl<VdProFormColumnsType>(name, patch, options);
};
