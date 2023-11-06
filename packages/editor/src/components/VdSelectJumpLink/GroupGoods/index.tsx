import { forwardRef, useImperativeHandle, useState } from 'react';
import { JumpModalRef } from '../type';

export type GroupGoodsProps = {};

/** 商品组页面地址选择 */
const GroupGoods = forwardRef<JumpModalRef, GroupGoodsProps>((props, ref) => {
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
export default GroupGoods;
