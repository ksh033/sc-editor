import { VdProFormColumnsType } from '../../interface';

const propsConfig: VdProFormColumnsType<any>[] = [
  {
    dataIndex: 'show_method',
    valueType: 'VdRadioIcon',
    fieldProps: {
      // @ts-ignore
      block: true,
      lineBlock: true,
      type: 'image',
      showValue: false,
      styles: { padding: '10px 34px 12px' },
      options: [
        {
          text: '一行一个',
          value: 'single',
          icon: 'deco-icon-up2end',
        },
        {
          text: '轮播海报',
          value: 'swiper',
          icon: 'deco-icon-carousel',
        },
        {
          text: '横向滑动',
          value: 'scroll',
          icon: 'deco-icon-carousel',
        },
      ],
    },
  },
  {
    valueType: 'divider',
  },
  {
    dataIndex: 'list',
    valueType: 'VdAddImageList',
    formItemProps: {
      rules: [
        {
          type: 'array',
          required: true,
          message: '请添加广告图片',
        },
      ],
    },
  },
  {
    valueType: 'divider',
  },
  {
    dataIndex: 'count',
    valueType: 'VdSelect',
    title: '一屏显示',
    formItemProps: {
      className: 'deco-control-group',
      style: {
        marginBottom: '8px',
      },
    },
    fieldProps: {
      options: [
        { value: 1, label: '一张图片' },
        { value: 2, label: '两张图片' },
        { value: 4, label: '四张图片' },
        { value: 5, label: '五张图片' },
        { value: 6, label: '六张图片' },
      ],
    },
  },
  {
    dataIndex: 'line',
    valueType: 'divider',
  },
  {
    dataIndex: 'indicator',
    title: '指示器',
    valueType: 'VdRadioIcon',
    fieldProps: {
      options: [
        {
          text: '样式一',
          value: '1',
          icon: 'deco-icon-indicator-1',
        },
        {
          text: '样式二',
          value: '2',
          icon: 'deco-icon-indicator-2',
        },
        {
          text: '样式三',
          value: '3',
          icon: 'deco-icon-indicator-3',
        },
        {
          text: '样式四',
          value: '4',
          icon: 'deco-icon-indicator-4',
        },
      ],
    },
  },
  {
    dataIndex: 'image_style',
    title: '图片样式',
    valueType: 'VdRadioIcon',
    fieldProps: {
      options: [
        {
          text: '常规',
          value: 'normal',
          icon: 'deco-icon-image-ad-normal',
        },
        {
          text: '投影',
          value: 'shadow',
          icon: 'deco-icon-shadow',
        },
      ],
    },
  },
  {
    dataIndex: 'image_fill_style',
    title: '填充方式',
    valueType: 'VdRadioIcon',
    fieldProps: {
      options: [
        {
          text: '填充',
          value: 'cover',
          icon: 'deco-icon-img-cover',
        },
        {
          text: '周边留白',
          value: 'contain',
          icon: 'deco-icon-img-contain',
        },
      ],
    },
  },
  {
    dataIndex: 'corner_type',
    title: '图片倒角',
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
    title: '页面边距',
    valueType: 'VdSlider',
    dataIndex: 'page_margin',
    fieldProps: {
      max: 30,
    },
  },
  {
    title: '图片边距',
    valueType: 'VdSlider',
    dataIndex: 'image_margin',
    fieldProps: {
      max: 30,
    },
  },
];

export default propsConfig;
