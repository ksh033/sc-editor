// import { ProFormColumnsType } from '@ant-design/pro-form';
// import { FormSchema } from '@ant-design/pro-form/es/components/SchemaForm';
// import { cloneDeep } from 'lodash';
// import BaseForm from '../BaseForm';
// import {
//   CmpInfo,
//   ComponentSchemaType,
//   Mixin,
//   VdProFormColumnsType,
// } from '../interface';
// import { genNonDuplicateId } from '../utils';
// import { validateRules } from '../utils/validateUtil';
// import { filterPageConfig } from './util';

// export type FormProps = Omit<FormSchema<any, any>, 'layoutType' | 'columns'>;

// abstract class ParentSchemCmp implements ComponentSchemaType, Mixin {
//   // 基础配置
//    static info: CmpInfo = {
//     name: '',
//     maxNum: 0,
//     usedNum: 0,
//     status: 'success',
//     cmpType: 'ParentSchemCmp',
//   };
//   formProps: FormProps = {};

//   propsConfig: VdProFormColumnsType[] = [];
  
//   id: string = '';
//   values: any = {};
//   immediatelyCheck: boolean = false;

//   constructor(values = {}) {
//     this.values = values;
//     this.id = genNonDuplicateId();

//   }
//   cmpType: string="";
//   cmpName?: string | undefined;

//   formatValues?: ((allValues: any) => void) | undefined;



//   getInitialValue?(): any;
//   getPropsConfig?(
//     columns: ProFormColumnsType[],
//     record: any
//   ): ProFormColumnsType[];
//   /** 默认渲染方式 */
//   render(baseProps: any) {
//     let columns: ProFormColumnsType[] = [];
//     if (Array.isArray(this.propsConfig)) {
//       columns = filterPageConfig(this.propsConfig);
//       if (this.getPropsConfig) {
//         columns = this.getPropsConfig(columns, this.values);
//       }
//     }
//     return <BaseForm {...baseProps} columns={columns}></BaseForm>;
//   }
//   onValuesChange?(changedValues: any, allValues: any): any;
//   /** 获取校验结果 */
//   async getRuleCheck() {
//     let newcolumns = cloneDeep(filterPageConfig(this.propsConfig));
//     if (this.getPropsConfig) {
//       newcolumns = this.getPropsConfig(newcolumns, this.values);
//     }
//     const itemFlag = await validateRules(newcolumns, this.values);
//     return itemFlag;
//   }
//   onFilter(
//     columns: ProFormColumnsType[],
//     fn: (item: ProFormColumnsType) => boolean
//   ) {
//     return columns.filter(fn);
//   }

//   setId(id: string) {
//     this.id = id;
//   }

//   getFieldsValue() {
//     return this.values;
//   }
//   setFieldsValue(record: any) {
//     if (Object.prototype.toString.call(record) === '[object Object]') {
//       this.values = record;
//     }
//   }
//   setImmediatelyCheck(check: boolean) {
//     this.immediatelyCheck = check;
//   }

//   initClass(record: ComponentSchemaType) {
//     this.id = record.id;
//     this.immediatelyCheck = record.immediatelyCheck;
//     this.values = record.values;
//   }
// }

// export default ParentSchemCmp;
import * as AttrComps from '../components';
import {BaseSchemaClass, BaseSchemaEditor} from '@sceditor/editor-core'
export type ComponentItemType = keyof typeof AttrComps;
class SysSchemaEditor extends  BaseSchemaEditor implements BaseSchemaClass{



}

export default SysSchemaEditor