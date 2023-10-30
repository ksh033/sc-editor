import { BaseImage, Link } from '../../interface/common.d';
import type { BaseFromItemProps } from '@sceditor/core';

export type VdImgLinkEntryItem = BaseImage & Link;

export type VdImgLinkProps = BaseFromItemProps<VdImgLinkEntryItem>;
