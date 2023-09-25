
export {SysComponents} from './type'
import type {SysComponentsEnumType} from './type'
const components=new Map<string,any>()
export function registerCmp(
    cmpType: SysComponentsEnumType,cmp:any
  ):void;

  export function registerCmp(
    cmpType: string,cmp:any
  ):void;
export function registerCmp(type,cmp){

    components.set(type,cmp)

}


export const getCmpByType=(type:string)=>{
    return components.get(type)
}