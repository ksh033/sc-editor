import { BaseImage, JumpLink } from '../../interface/common.d';
import type { BaseFromItemProps } from '@sceditor/core';

export type AddImageItem = BaseImage & {
  /** 跳转方式 */
  jumpType?: 'ALL' | 'PART';
  link?: JumpLink | JumpLink[];
};

export type AddImageItemProps = BaseFromItemProps<AddImageItem>;
