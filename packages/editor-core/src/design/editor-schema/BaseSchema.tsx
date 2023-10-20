import type { ProFormColumnsType } from '@ant-design/pro-form';
import { FormSchema } from '@ant-design/pro-form/es/components/SchemaForm';
import { cloneDeep } from 'lodash';
import BaseForm from './BaseForm';

import { genNonDuplicateId } from '../../utils';
import { validateRules } from '../../utils/validateUtil';
import { filterPageConfig } from './util';
import React from 'react';

export type FormProps = Omit<FormSchema<any, any>, 'layoutType' | 'columns'>;
export interface EditorData {
  id: string,
  cmpType: string,
  values: any, 
  cmpName?: string, 
  index?: number
};


/**
 * 编辑器属性组件
 */
export interface EditorPropertyComponent<P> extends React.FC<P> {
  /**
   * 属性组件类型
   */
  valueType: string;
}
// 组件展示基础信息
export interface CmpInfo {
  // type?: string | Array<string>;
  name: string;
  description?: string;
  cmpType: string;
  icon?: string;
  maxNum: number;
  usedNum: number;
  status: string;
}
/** 左侧组件显示的信息 */
export interface CompsGroup {
  id: string;
  name: string;
  actived: boolean;
  list: CmpInfo[];
}

export type { ProFormColumnsType };


/** 组件配置的数据结构 */
export interface BaseSchemaClass {
  id: string;
  index?: number;
  values: any;
  immediatelyCheck: boolean; // 加载组件的时候是否立即校验
  cmpType: string; // 映射组件用的
  cmpName?: string;
  propsConfig: ProFormColumnsType<any, any>[]; // 右侧属性配置栏显示
  getInitialValue?: () => any; // 右侧属性初始化数据
  getPropsConfig?: (
    columns: ProFormColumnsType[],
    record: any
  ) => ProFormColumnsType[];
  render: (props?: any) => React.ReactNode | React.ReactElement<any, any> | null;
  getRuleCheck: () => Promise<boolean>;
  onValuesChange?: (changedValues: any, allValues: any) => any;
  formatValues?: (allValues: any) => void;
  initClass: (record: BaseSchemaClass) => void;
  formProps?: any;
  onFilter?: (
    columns: ProFormColumnsType[],
    fn: (item: ProFormColumnsType) => boolean
  ) => ProFormColumnsType[];
  inCluded?: (columns: ProFormColumnsType[], list: React.Key[]) => boolean;
  getFieldsValue: () => any;
  setFieldsValue: (record: any) => void;
  setImmediatelyCheck: (checked: boolean) => void;
  setId: (id: string) => void;

  getData: () => EditorData
}





export interface Mixin {
  onFilter?: (
    columns: ProFormColumnsType[],
    fn: (item: ProFormColumnsType) => boolean
  ) => ProFormColumnsType[];
  inCluded?: (columns: ProFormColumnsType[], list: React.Key[]) => boolean;
  getFieldsValue: () => any;
  setFieldsValue: (record: any) => void;
  setImmediatelyCheck: (checked: boolean) => void;
  setId: (id: string) => void;
}


/** 组件配置的数据结构 */
export interface ComponentSchemaType {

  id: string;
  values: any;
  immediatelyCheck: boolean; // 加载组件的时候是否立即校验
  cmpType: string; // 映射组件用的
  cmpName?: string;
  propsConfig: ProFormColumnsType<any>[]; // 右侧属性配置栏显示
  getInitialValue?: () => any; // 右侧属性初始化数据
  getPropsConfig?: (
    columns: ProFormColumnsType[],
    record: any
  ) => ProFormColumnsType[];
  render: (props: any) => React.ReactNode | React.ReactElement<any, any> | null;
  getRuleCheck: () => Promise<boolean>;
  onValuesChange?: (changedValues: any, allValues: any) => any;
  formatValues?: (allValues: any) => void;
  initClass: (record: ComponentSchemaType) => void;
  formProps?: any;
}

abstract class BaseSchemaEditor implements BaseSchemaClass {
  // 基础配置
  static info: CmpInfo = {
    name: '',
    maxNum: 0,
    usedNum: 0,
    status: 'success',
    cmpType: 'ParentSchemCmp',
  };
  formProps = {};

  propsConfig!: ProFormColumnsType<any, any>[];

  id: string = '';
  values: any = {};
  immediatelyCheck: boolean = false;

  constructor(values = {}) {
    this.values = values;
    this.id = genNonDuplicateId();
  }
  index?: number | undefined;
  inCluded?: ((columns: ProFormColumnsType[], list: React.Key[]) => boolean) | undefined;
  getData() {


    return { id: this.id, values: this.values, cmpType: this.cmpType, index: this.index, cmpName: this.cmpName }
  }
  cmpType: string = "";
  cmpName?: string | undefined;
  formatValues?: ((allValues: any) => void) | undefined;

  getInitialValue?(): any;
  getPropsConfig?(
    columns: ProFormColumnsType[],
    record: any
  ): ProFormColumnsType[];
  /** 默认渲染方式 */
  render(baseProps: any) {
    let columns: ProFormColumnsType[] = [];
    if (Array.isArray(this.propsConfig)) {
      columns = filterPageConfig(this.propsConfig);
      if (this.getPropsConfig) {
        columns = this.getPropsConfig(columns, this.values);
      }
    }
    return <BaseForm {...baseProps} columns={columns}></BaseForm>;
  }
  onValuesChange?(changedValues: any, allValues: any): any;
  /** 获取校验结果 */
  async getRuleCheck() {
    let newcolumns = cloneDeep(filterPageConfig(this.propsConfig));
    if (this.getPropsConfig) {
      newcolumns = this.getPropsConfig(newcolumns, this.values);
    }
    const itemFlag = await validateRules(newcolumns, this.values);
    return itemFlag;
  }
  onFilter(
    columns: ProFormColumnsType[],
    fn: (item: ProFormColumnsType) => boolean
  ) {
    return columns.filter(fn);
  }

  setId(id: string) {
    this.id = id;
  }

  getFieldsValue() {
    return this.values;
  }
  setFieldsValue(record: any) {
    if (Object.prototype.toString.call(record) === '[object Object]') {
      this.values = record;
    }
  }
  setImmediatelyCheck(check: boolean) {
    this.immediatelyCheck = check;
  }

  initClass(record) {
    this.id = record.id;
    this.immediatelyCheck = record.immediatelyCheck;
    this.values = record.values;
  }
}


export type AbsBaseSchemaClass = typeof BaseSchemaEditor
export default BaseSchemaEditor;
