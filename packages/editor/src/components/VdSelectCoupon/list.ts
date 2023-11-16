import type { PageConfig } from '@scboson/sc-schema';

const pageConfig: PageConfig = {
  queryConfig: [
    {
      label: '优惠券名称',
      name: 'couponTitle',
      component: 'Input',
      props: {
        placeholder: '请输入优惠券名称',
      },
    },
  ],
  tableConfig: [
    {
      title: '优惠券编码',
      dataIndex: 'couponCode',
      width: 100,
      ellipsis: true,
    },
    {
      title: '优惠券名称',
      dataIndex: 'couponTitle',
      width: 150,
      ellipsis: true,
    },
    {
      title: '优惠券类型',
      dataIndex: 'couponType',
      width: 90,
    },
    {
      title: '优惠券内容',
      dataIndex: 'useReference',
      ellipsis: true,
      width: 250,
    },

    {
      title: '发行总量',
      width: 90,
      dataIndex: 'publishQuantity',
    },
    {
      title: '未领取',
      width: 90,
      dataIndex: 'notGainQuantity',
    },
  ],
};
export default pageConfig;
