import type { VdAddListProps } from '../VdAddList';

export type VdSelectCouponProps = {
  value: CouponItem[];
  onChange: (value: CouponItem[]) => void;
  getCheckboxProps?: (
    record: any
  ) => Partial<Omit<any, 'checked' | 'defaultChecked'>>;
} & Pick<VdAddListProps<CouponItem>, 'renderItem'>;

export type CouponItemProps = {
  couponTitle: string;
  couponId: string;
  couponCode: string;
  useReference: string;
  couponType: string;
};
