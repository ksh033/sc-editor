import { forwardRef, useImperativeHandle, useState } from 'react';
import { JumpModalRef } from '../type';

export type SingleGoodsProps = {};

/** 单个商品页面地址选择 */
const SingleGoods = forwardRef<JumpModalRef, SingleGoodsProps>((props, ref) => {
  const [open, setOpen] = useState<Boolean>(false);
  const onOpen = () => {
    setOpen(true);
  };

  useImperativeHandle(ref, () => {
    return {
      open: onOpen,
    };
  });

  return <div>12</div>;
});
export default SingleGoods;
