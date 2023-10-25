/** 链接参数 */
export type Link = {
  /** 链接标题 */
  linkTitle?: string;
  /** 跳转地址 */
  linkValue?: string;
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
