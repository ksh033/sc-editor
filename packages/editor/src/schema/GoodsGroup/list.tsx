import { VdProFormColumnsType } from '../../interface';

const propsConfig: VdProFormColumnsType[] = [
  // {
  //   dataIndex: 'goods_from',
  //   valueType: 'VdRadioGroup',
  //   title: '添加商品',
  //   formItemProps: {
  //     className: 'deco-control-group',
  //     style: {
  //       marginBottom: '8px',
  //     },
  //   },
  //   fieldProps: {
  //     options: [
  //       { value: '0', label: '商品' },
  //       { value: '1', label: '选择分组' },
  //     ],
  //   },
  // },
  // {
  //   dataIndex: 'goods',
  //   valueType: 'VdGoodsList',
  //   formItemProps: {
  //     className: 'deco-control-style-group',
  //   },
  // },
  // {
  //   dataIndex: 'sub_entry',
  //   valueType: 'VdGoodsGroup',
  //   formItemProps: {
  //     className: 'deco-control-style-group',
  //   },
  // },
  {
    dataIndex: 'list',
    valueType: 'VdGoodsList',
  },
  {
    dataIndex: 'line',
    valueType: 'divider',
  },
  /** 商品属性集合 */
  {
    key: 'goods-group',
    valueType: 'VdGoodsProperty',
    formItemProps: {
      className: 'deco-control-no-padding',
    },
  },
];

export default propsConfig;
