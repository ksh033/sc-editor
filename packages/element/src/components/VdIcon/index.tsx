// import { createFromIconfontCN } from '@ant-design/icons';
// // const iconfont = require('./iconfont');
// const VdIcon = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_3309387_6njmdred1hq.js',
// });
// export default VdIcon;
import React from 'react';
import './index.less';
import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';
type VdIconProps = {
  type: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  style?: React.CSSProperties;
};

const VdIcon: EditorPropertyComponent<VdIconProps> = (props) => {
  return (
    <i className={props.type} onClick={props.onClick} style={props.style}></i>
  );
};
VdIcon.valueType="VdIcon"
registerEditorAttrCmp(VdIcon)
export default VdIcon;
