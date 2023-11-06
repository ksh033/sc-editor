import { VdProFormColumnsType } from '../../interface';

const propsConfig: VdProFormColumnsType[] = [
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
