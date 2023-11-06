export type VdSelectJumpLinkProps = {
  type?: 'button' | 'link';
  btnText?: string;
};

export type JumpModalRef = {
  /** 打开弹窗 */
  open: () => void;
};
