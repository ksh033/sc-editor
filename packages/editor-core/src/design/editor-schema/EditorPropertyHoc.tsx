import React from 'react';
import { useContext } from 'react';
export const EditorPropertyContext = React.createContext<{
  rowData: any;
  editList: any;
  id: string;
}>({
  rowData: null,
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
