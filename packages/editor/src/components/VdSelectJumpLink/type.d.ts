import { values } from 'lodash';
import { Link } from '../../interface/common';

export type SelectJumpLinkValue = Link & {
  /** 链接包含的内容 */
  innerContent?: any;
};

export type VdSelectJumpLinkProps = {
  type?: 'button' | 'link';
  btnText?: string;
  value?: SelectJumpLinkValue;
};

export type JumpModalRef = {
  /** 打开弹窗 */
  open: () => void;
};
