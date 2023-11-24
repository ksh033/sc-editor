import { values } from 'lodash';
import { Link } from '../../interface/common';

export type SelectJumpLinkValue = Link & {
  /** 链接包含的内容 */
  innerContent?: any;
};
/** 跳转组件 */
export type VdSelectJumpLinkProps = {
  type?: 'button' | 'link';
  btnText?: string;
  value?: SelectJumpLinkValue;
  onChange?: (val?: SelectJumpLinkValue) => void;
};

export type JumpModalRef = {
  /** 打开弹窗 */
  open: () => void;
};
