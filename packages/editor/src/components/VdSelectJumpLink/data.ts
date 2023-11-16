import type { MenuProps } from 'antd';

export const items: MenuProps['items'] = [
  {
    key: 'goods',
    label: '商品',
    children: [
      {
        key: 'single-goods',
        label: '单个商品',
      },
      {
        key: 'all-goods',
        label: '全部商品',
      },
    ],
  },
  {
    key: 'goods-group-key',
    label: '商品分组',
    children: [
      {
        key: 'goods-group',
        label: '商品分组',
      },
    ],
  },
  {
    key: 'coupon-key',
    label: '优惠券',
    children: [
      {
        key: 'coupon',
        label: '优惠券',
      },
    ],
  },
  {
    key: 'custom-link-key',
    label: '自定义链接',
    children: [
      {
        key: 'custom-link',
        label: '自定义链接',
      },
    ],
  },
];
