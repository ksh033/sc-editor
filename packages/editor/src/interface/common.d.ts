/** 链接类型: 小程序路径APP、外部链接URL、程序控制SERVICE、微信扫一扫MINIAPP_SCAN */
export type LinkTypeEnum = 'APP' | 'URL' | 'SERVICE' | 'MINIAPP_SCAN';

/** 链接参数选择对象: 商品分组GOODS_GROUP、商品GOODS、外部链接NONE、COUPON优惠券 页面PAGE*/
export type LinkSelectTypeEnum =
  | 'GOODS_GROUP'
  | 'GOODS'
  | 'COUPON'
  | 'PAGE'
  | 'NONE'
  | 'ALL_GOODS';

/** 链接参数 */
export type Link = {
  /** 链接配置ID */
  linkConfigId?: string;
  /** 链接标题 */
  linkTitle?: string;
  /** 跳转地址 */
  linkValue?: string;
  /** 链接类型: 小程序路径APP、外部链接URL、程序控制SERVICE、微信扫一扫MINIAPP_SCAN */
  linkType?: LinkTypeEnum;
  /** 链接参数选择对象: 商品分类GOODS_CATALOG、商品GOODS、活动PROMOTION、领券活动COUPON_GET_PROM、抽奖LOTTERY、外部链接NONE、页面PAGE、微信扫一扫WECHAT_SCAN、扫码入群SCAN_JOIN_GROUP */
  linkSelectType?: LinkSelectTypeEnum;
  /** 链接选择数据 */
  linkSelectContent?: any;
};

export type JumpLink = Link & {
  /** 占据宽度切割 */
  width?: number;
  /** 占据高度多少 */
  height?: number;
  /** x位置 */
  x?: number;
  /** y位置 */
  y?: number;
};
/** 基础图片处理 */
export type BaseImage = {
  /** 图片id */
  imageId?: string;
  /** 图片地址 */
  imageUrl?: string;
  /** 缩略图 */
  imageThumbUrl?: string;
  /** 图片宽度 */
  imageWidth?: number;
  /**图片高度 */
  imageHeight?: number;
};
