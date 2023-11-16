import { ProFormColumnsType } from '@ant-design/pro-form';
import { BaseSchemaEditor, registerEditor } from '@sceditor/editor-core';
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import propsConfig from './list';
import { SysComponents } from '@sceditor/core';

class Coupon extends BaseSchemaEditor {
  // cmpType: string = 'Coupon';
  //cmpName: string = '优惠券';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (
          record['coupon_source'] === 'add' &&
          dataIndex === 'couponAutoSet'
        ) {
          return null;
        }
        if (record['coupon_source'] === 'auto' && dataIndex === 'list') {
          return null;
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
  }
  getInitialValue() {
    return {
      list: [],
      coupon_source: 'add',
      couponAutoSet: {
        isShowAll: true,
        hideUnsharedCoupon: false,
      },
      coupon_style: '1',
      coupon_color: '1',
      layout: 'G1',
    };
  }
}

Coupon.info = {
  icon: require('../../icons/coupon.png'),
  name: '优惠券',
  cmpType: SysComponents.Coupon,
  maxNum: 50,
  usedNum: 0,
  status: '',
};
registerEditor(Coupon);
export default Coupon;
