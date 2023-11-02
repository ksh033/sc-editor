import { ItemType } from './type';

const buyBtns: ItemType[] = [
  {
    key: 'cart1',
    label: '购物车1',
    icon: 'deco-icon-cart-1',
  },
  {
    key: 'cart2',
    label: '购物车2',
    icon: 'deco-icon-cart-2',
  },
  {
    key: 'hollow',
    label: '空心加购',
    icon: 'deco-icon-cart-3',
  },
  {
    key: 'fill',
    label: '实心加购',
    icon: 'deco-icon-cart-6',
  },
  {
    key: 'circle-fill',
    label: '圆角实心',
    icon: 'deco-icon-cart-5',
    btnText: '马上抢',
  },
  {
    key: 'square-fill',
    label: '直角实心',
    icon: 'deco-icon-cart-7',
    btnText: '马上抢',
  },
  {
    key: 'circle-hollow',
    label: '圆角空心',
    icon: 'deco-icon-cart-4',
    btnText: '购买',
  },
  {
    key: 'square-hollow',
    label: '直角空心',
    icon: 'deco-icon-cart-8',
    btnText: '购买',
  },
  {
    key: 'none',
    label: '不显示',
    icon: 'deco-icon-no-show',
  },
];

const dataMap = {
  buyBtns: buyBtns,
};

export default dataMap;
