
import React from 'react';
import  { SysComponents, type SysComponentsEnumType } from './type'
/**
 * 编辑器属性组件
 */
export interface AppUIComponents<P, ValueTyps=SysComponentsEnumType> extends React.FC<P> {
  /**
   * 组件类型
   */
  cmpType: ValueTyps;
}

export type FC<T>= React.FC<T>


export { default as IframePostMessage } from './message'
export type { SysComponentsEnumType }
export {SysComponents}
const _components = new Map<string, any>()
export function registerCmp(
  cmpType: SysComponentsEnumType, cmp: any
): void;
export function registerCmp(
  cmpType: string, cmp: any
): void;
export function registerCmp(type, cmp) {

  _components.set(type, cmp)

}


export const getCmpByType = (type: string) => {
  return _components.get(type)
}

export const getComponents = () => {

  return _components
}
export const  RegAppUIComponent= <T extends {}>(cmp: AppUIComponents<T>): FC<T> => {
  const Warp = (props: T) => {
    return React.createElement<T>(cmp, props)
  }
  registerCmp(cmp.cmpType, Warp)

  return Warp
}