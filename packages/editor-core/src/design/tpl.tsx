import { ProFormColumnsType } from "@ant-design/pro-form";



const tpls: {
    [propName: string]: any;
  } = {};
  
  export function getSchemaTpl<T>(
    name: string,
    patch?: object,
    options?: object
  ): T {
    const tpl = tpls[name] || {};
    let schema:any = {};
  
    if (typeof tpl === 'function') {
      schema = tpl(patch, options);
    } else {
      schema = patch
        ? {
            ...tpl,
            ...patch
          }
        : tpl;
    }
    return schema;
  }
  
 export function setSchemaTpl<K extends string,T=ProFormColumnsType>(name: K, value: T) {
    tpls[name] = value;
  }
  