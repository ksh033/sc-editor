import { BaseImage, Link } from '../../interface/common.d';

export type VdImgLinkEntryItem = BaseImage & Link;

export type VdImgLinkProps = {
  value?: VdImgLinkEntryItem;
  onChange?: (val: VdImgLinkEntryItem) => void;
};
