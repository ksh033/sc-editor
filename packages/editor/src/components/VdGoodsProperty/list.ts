import { VdProFormColumnsType } from '../../interface';
import { getSchemaTpl } from '../../schema/tpl';

const propsConfig: VdProFormColumnsType[] = [
  {
    title: '列表样式',
    dataIndex: 'goods_type',
    valueType: 'VdRadioIcon',
    fieldProps: {
      block: true,
      options: [
        {
          text: '大图模式',
          value: 'G1',
          icon: 'deco-icon-big',
        },
        {
          text: '一行两个',
          value: 'G2',
          icon: 'deco-icon-small',
        },
        {
          text: '一行三个',
          value: 'G3',
          icon: 'deco-icon-three',
        },
        {
          text: '详细列表',
          value: 'G4',
          icon: 'deco-icon-list',
        },
        {
          text: '一大两小',
          value: 'G7',
          icon: 'deco-icon-hybrid',
        },
        {
          text: '横向滑动',
          value: 'G5',
          icon: 'deco-icon-swipe',
        },
      ],
    },
  },
  {
    valueType: 'divider',
  },
  {
    title: '商品样式',
    dataIndex: 'goods_style',
    valueType: 'VdRadioIcon',
    fieldProps: {
      block: true,
      showValue: false,
      options: [
        {
          text: '无边白底',
          value: 'NO_BORDER_BG_WHITE',
        },
        {
          text: '卡片投影',
          value: 'CARD_SHADOW',
        },
        {
          text: '描边白底',
          value: 'WHITE_BORDER',
        },
        {
          text: '无边透明底',
          value: 'NO_BORDER_TRANSPARENT',
        },
      ],
    },
  },
  {
    dataIndex: 'buy_btn_express',
    valueType: 'VdSelectBuyBtnStyle',
    title: '购买按钮样式',
  },
  {
    title: '商品倒角',
    dataIndex: 'border_radius_type',
    valueType: 'VdRadioIcon',
    fieldProps: {
      options: [
        {
          text: '直角',
          value: 'straight',
          icon: 'deco-icon-corner-straight',
        },
        {
          text: '圆角',
          value: 'round',
          icon: 'deco-icon-corner-round',
        },
      ],
    },
  },
  {
    title: '图片比例',
    dataIndex: 'display_scale',
    valueType: 'VdRadioIcon',
    fieldProps: {
      options: [
        {
          text: '3:2',
          value: '0',
          icon: 'deco-icon-3-2',
        },
        {
          text: '1:1',
          value: '1',
          icon: 'deco-icon-1-1',
        },
        {
          text: '3:4',
          value: '2',
          icon: 'deco-icon-3-4',
        },
        {
          text: '16:9',
          value: '3',
          icon: 'deco-icon-16-9',
        },
      ],
    },
  },
  getSchemaTpl('fill', {
    title: '图片填充',
    dataIndex: 'image_fill_style',
  }),
  getSchemaTpl('fontWeight', {
    dataIndex: 'text_style_type',
    title: '文本样式',
  }),
  {
    title: '页面边距',
    valueType: 'VdSlider',
    dataIndex: 'page_margin',
    fieldProps: {
      max: 30,
    },
  },
  {
    title: '商品间距',
    valueType: 'VdSlider',
    dataIndex: 'goods_margin',
    fieldProps: {
      max: 30,
    },
  },
  {
    valueType: 'divider',
  },
  {
    dataIndex: 'show_goods_name',
    valueType: 'VdCheckBox',
    title: '商品名称',
  },
  {
    dataIndex: 'show_goods_desc',
    valueType: 'VdCheckBox',
    title: '商品描述',
  },
  {
    dataIndex: 'show_goods_price',
    valueType: 'VdCheckBox',
    title: '商品价格',
  },
  {
    dataIndex: 'show_mark_price',
    valueType: 'VdCheckBox',
    title: '商品原价',
  },
  {
    dataIndex: 'show_corner_mark',
    valueType: 'VdRadioGroup',
    title: '商品角标',
    fieldProps: {
      options: [
        { value: false, label: '不显示' },
        { value: true, label: '营销角标' },
        {
          value: '2',
          label: '属性角标',
          tip: '需在商品编辑页关联标签才会显示属性角标。',
        },
      ],
    },
  },
];

export default propsConfig;
