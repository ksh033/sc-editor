import { ProFieldFCRenderProps, ProRenderFieldPropsType } from "@ant-design/pro-provider";
import React, { useContext } from "react";
import { BaseSchemaClass, CmpInfo, AbsBaseSchemaClass, CompsGroup, EditorPropertyComponent } from "./design"
import { SysComponents, IframePostMessage } from '@sceditor/cmp-center'
// iframeId 页面的id
const iframeId = 'myFrame';
export { iframeId };
export const EditorPropertyContext = React.createContext<{ rowData: any, editList: any }>({
  rowData: null,
  editList: null
});

const builtEditors: Record<string, AbsBaseSchemaClass> = {}
const valueTypeMap: Record<string, ProRenderFieldPropsType> = {};
/**
 * 注册设计器组件
 * @param klass 
 */
export function registerEditor(klass: AbsBaseSchemaClass) {

  if (!builtEditors[klass.info.cmpType]) {
    /// klass.prototype.cmpName=klass.info.name
    // klass.prototype.cmpType=klass.info.cmpType
    // klass.prototype.
    const editorClass = class extends klass {
      cmpType = klass.info.cmpType;
      cmpName = klass.info.name
    };
    builtEditors[klass.info.cmpType] = editorClass
  }
}

/**
 * 
 * @param klass 编辑器属性控件
 * @param valueType 
 */
export function registerEditorAttrCmp(klass: EditorPropertyComponent<any>, valueType?: string) {
  const type = klass.valueType || valueType
  if (type && !valueTypeMap[type]) {
    valueTypeMap[type] = {
      renderFormItem: (_text: any, props: ProFieldFCRenderProps, _dom: JSX.Element) => {
        const editorValue = useContext(EditorContext)

        return React.createElement(klass, { ...props, ...props?.fieldProps, ...editorValue })
      }
    }
  }
}




export type { BaseSchemaClass, CmpInfo, AbsBaseSchemaClass, CompsGroup }

export interface EditorManagerConfig {

  previewWin: Window
  originUrl?
}
/**
 * 在 component/Editor.tsx 里面实例化的。
 * 辅助 component/Editor.tsx 实现一些非 UI 相关的功能。
 */
export class EditorManager {
  protected message
  constructor(readonly config: EditorManagerConfig) {
    this.message = new IframePostMessage(config.previewWin, config.originUrl)
  }



  //获取编辑器
  getEditorsMap() {

    return builtEditors;
  }
  getEditorByType(cmpType: string);
  getEditorByType(cmpType: keyof typeof SysComponents);
  getEditorByType(cmpType) {


    return builtEditors[cmpType]

  }
  //获取编辑器属性控件
  getEditorPropertyComponentMap() {

    return valueTypeMap
  }

}

/* Creating a context object with the default values. */
export const EditorContext = React.createContext<{ manager: EditorManager }>({
  manager: new EditorManager()
});
