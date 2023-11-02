// import { createFromIconfontCN } from '@ant-design/icons';
// // const iconfont = require('./iconfont');
// const VdIcon = createFromIconfontCN({
//   scriptUrl: '//at.alicdn.com/t/font_3309387_6njmdred1hq.js',
// });
// export default VdIcon;
import React from 'react';
import classnames from 'classnames';
import './index.less';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';
type VdIconProps = {
  type: string;
  onClick?: (e: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  style?: React.CSSProperties;
  className?: string;
};

const VdIcon: SysEditorPropertyComponent<VdIconProps> = (props) => {
  return (
    <i
      className={classnames(props.type, props.className)}
      onClick={props.onClick}
      style={props.style}
    ></i>
  );
};
VdIcon.valueType = 'VdIcon';
registerEditorAttrCmp(VdIcon);
export default VdIcon;
