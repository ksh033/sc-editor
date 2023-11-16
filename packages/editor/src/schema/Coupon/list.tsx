import { VdProFormColumnsType } from '../../interface';
import CouponItem from './CouponItem';

const propsConfig: VdProFormColumnsType[] = [
  {
    dataIndex: 'coupon_source',
    valueType: 'VdRadioGroup',
    title: '添加优惠券',
    formItemProps: {
      className: 'deco-control-group-margin-bottom',
    },
    fieldProps: {
      options: [
        { value: 'add', label: '手动添加' },
        {
          value: 'auto',
          label: '自动获取',
          tip: '系统自动获取仅设置为“公开领取”的店铺优惠券，新创建的券排在前面',
        },
      ],
    },
  },
  {
    dataIndex: 'list',
    valueType: 'VdSelectCoupon',
    formItemProps: {
      rules: [
        {
          type: 'array',
          required: true,
          message: '请选择优惠券',
        },
      ],
    },
    fieldProps: {
      renderItem: (record: any) => {
        return <CouponItem {...record}></CouponItem>;
      },
    },
  },
  {
    dataIndex: 'couponAutoSet',
    valueType: 'VdCouponSet',
    formItemProps: {
      rules: [
        {
          type: 'object',
          validator(
            _: any,
            value: any,
            callback: (arg0?: string | undefined) => void
          ) {
            if (value != null) {
              if (
                Boolean(value.isShowAll) === false &&
                (value.couponNum == null || value.couponNum == '')
              ) {
                callback('请输入10以内的数字');
              }
            }
            callback();
          },
        },
      ],
    },
  },
  {
    title: '排列样式',
    dataIndex: 'layout',
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
        // {
        //   text: '一行三个',
        //   value: 'G3',
        //   icon: 'deco-icon-three',
        // },
        {
          text: '横向滑动',
          value: 'G5',
          icon: 'deco-icon-swipe',
        },
      ],
    },
  },
  {
    title: '卡片样式',
    dataIndex: 'coupon_style',
    valueType: 'VdRadioIcon',
    fieldProps: {
      block: true,
      options: [
        {
          text: '样式一',
          value: '1',
          icon: 'deco-icon-coupon-1',
        },
        {
          text: '样式二',
          value: '2',
          icon: 'deco-icon-coupon-2',
        },
        {
          text: '样式三',
          value: '3',
          icon: 'deco-icon-coupon-3',
        },
        {
          text: '样式四',
          value: '4',
          icon: 'deco-icon-coupon-4',
        },
        {
          text: '样式五',
          value: '5',
          icon: 'deco-icon-coupon-8',
          fontSize: '14px',
        },
        {
          text: '样式六',
          value: '6',
          icon: 'deco-icon-coupon-6',
          fontSize: '14px',
        },
        {
          text: '样式七',
          value: '7',
          icon: 'deco-icon-coupon-5',
          fontSize: '14px',
        },
        {
          text: '样式八',
          value: '8',
          icon: 'deco-icon-coupon-7',
          fontSize: '14px',
        },
      ],
    },
  },
  {
    dataIndex: 'coupon_color',
    valueType: 'VdColorRadioGroup',
    title: '颜色',
    fieldProps: {
      options: [
        { value: '1', label: '红色', color: 'rgb(231, 76, 44)' },
        { value: '2', label: '黄色', color: 'rgb(255, 233, 183)' },
        { value: '3', label: '白色', color: 'rgb(255, 255, 255)' },
        { value: '4', label: '黑色', color: 'rgb(56, 59, 62)' },
        { value: '5', label: '绿色', color: 'rgb(224, 244, 228)' },
      ],
    },
  },
  {
    dataIndex: 'hide_error_coupon',
    valueType: 'VdCheckBox',
    title: '隐藏已抢完及失效的券',
    fieldProps: {
      valueMap: {
        '1': '隐藏',
        '0': '不隐藏',
      },
      renderMsg() {
        return (
          <span style={{ color: '#969799', fontSize: '12px' }}>
            当页面无可显示的优惠券时，优惠券区块将隐藏
          </span>
        );
      },
    },
  },
];

export default propsConfig;
