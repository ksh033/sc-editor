import { VdProFormColumnsType } from '../../interface';

const propsConfig: VdProFormColumnsType[] = [
  {
    dataIndex: 'show_method',
    valueType: 'VdRadioIcon',
    formItemProps: {
      className: 'deco-control-no-padding',
    },
    fieldProps: {
      // @ts-ignore
      block: true,
      lineBlock: true,
      type: 'image',
      showValue: false,
      styles: { padding: '24px 70px 0px' },
      options: [
        {
          text: '顶部菜单',
          value: 'TOP_NAV',
          icon: 'deco-icon-top-tags',
        },
        {
          text: '左侧菜单',
          value: 'LEFT_NAV',
          icon: 'deco-icon-left-tags',
        },
      ],
    },
  },

  {
    title: '商品分组管理',
    dataIndex: 'sub_entry',
    valueType: 'VdGoodsGroup',
  },
  {
    key: '1',
    valueType: 'divider',
  },
  {
    title: '菜单样式',
    key: 'nav',
    valueType: 'group',
    fieldProps: { collapsible: false, expandIconPosition: 'end' },
    columns: [
      {
        title: '菜单吸顶',
        dataIndex: 'sticky',
        valueType: 'VdRadioIcon',
        fieldProps: {
          showValue: false,
          options: [
            {
              text: '吸顶',
              value: true,
            },
            {
              text: '不吸顶',
              value: false,
            },
          ],
        },
      },
      {
        title: '显示全部分组',
        dataIndex: 'show_all_tag',
        valueType: 'VdRadioIcon',
        fieldProps: {
          showValue: false,
          options: [
            {
              text: '显示',
              value: true,
            },
            {
              text: '不显示',
              value: false,
            },
          ],
        },
      },
      {
        title: '菜单样式',
        dataIndex: 'nav_style',
        valueType: 'VdRadioIcon',
        fieldProps: {
          showValue: false,
          options: [
            {
              text: '样式一',
              value: '1',
            },
            {
              text: '样式二',
              value: '2',
            },
            {
              text: '样式三',
              value: '3',
            },
          ],
        },
      },
    ],
  },
  {
    key: '2',
    valueType: 'divider',
  },
  {
    title: '样式设置',
    key: 'style',
    valueType: 'group',
    fieldProps: { collapsible: false, expandIconPosition: 'end' },
    columns: [
      /** 商品属性集合 */
      {
        key: 'goods-group',
        valueType: 'VdGoodsProperty',
        formItemProps: {
          className: 'deco-control-no-padding',
        },
      },
    ],
  },
];

export default propsConfig;
