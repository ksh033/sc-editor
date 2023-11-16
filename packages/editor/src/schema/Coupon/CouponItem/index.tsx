import { MenuOutlined } from '@ant-design/icons';
import type { CouponItemProps as CouponItemValueProps } from '../../../components/VdSelectCoupon/type';
import { Space } from 'antd';
import React from 'react';
import './index.less';

type CouponItemProps = {
  value: CouponItemValueProps;
};

const CouponItem: React.FC<CouponItemProps> = (props) => {
  const { value } = props;
  return (
    <div className="coupon-item" key={value.couponId}>
      <Space>
        <MenuOutlined />
        <span>优惠券：{value.couponTitle}</span>
      </Space>
    </div>
  );
};

export default CouponItem;
