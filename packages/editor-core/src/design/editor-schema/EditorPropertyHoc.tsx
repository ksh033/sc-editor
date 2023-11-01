import React from 'react';
import { useContext } from 'react';
export const EditorPropertyContext = React.createContext<{
  /** 属性数据 */
  attrFromData: any;
  /** 编辑列表数据 */
  editList: any;
  /** 当前组件的id */
  id: string;
}>({
  attrFromData: null,
  editList: null,
  id: '',
});

const EditorPropertyHoc = (Cmp: any) => {
  const HocCmp = (props: any) => {
    const editorValue = useContext(EditorPropertyContext);
    const newProps = { ...props, ...editorValue };
    return <Cmp {...newProps}></Cmp>;
  };
  return HocCmp;
};

export { EditorPropertyHoc };
