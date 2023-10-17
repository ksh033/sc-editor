
export {SysComponents} from './type'
import type {SysComponentsEnumType} from './type'

export {default as IframePostMessage}  from './message'
export type {SysComponentsEnumType}

const _components=new Map<string,any>()
export function registerCmp(
    cmpType: SysComponentsEnumType,cmp:any
  ):void;
 export function registerCmp(
    cmpType: string,cmp:any
  ):void;
export function registerCmp(type,cmp){

  _components.set(type,cmp)

}


export const getCmpByType=(type:string)=>{
    return _components.get(type)
}

export const getComponents=()=>{

  return _components
}
export const components=(cmpType: string,cmpName:string)=>{



  return function <T extends new (...args: any[]) => any>(constructor: T) {
    const editorClass=class extends constructor {
      cmpType = cmpType;
      cmpName = cmpName
    };
    if ((editorClass as any).info){
      (editorClass as any).info.cmpType=cmpType;
      (editorClass as any).info.name=cmpName
    }
    registerCmp(cmpType,editorClass)
    return editorClass
  };
}