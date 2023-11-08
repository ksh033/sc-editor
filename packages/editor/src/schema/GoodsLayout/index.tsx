import {
  BaseSchemaEditor,
  registerEditor,
  type FormProps,
  type ProFormColumnsType,
} from '@sceditor/editor-core';
import { VdProFormColumnsType } from '../../interface';
import propsConfig from './list';
import { SysComponents } from '@sceditor/core';

/** 商品 */
class GoodsLayout extends BaseSchemaEditor {
  propsConfig: VdProFormColumnsType[] = propsConfig;
  formProps: FormProps = {
    layout: 'horizontal',
  };
  getPropsConfig(columns: ProFormColumnsType<any>[]) {
    return columns;
  }
  onValuesChange(changedValues: any, allValues: any) {
    console.log('changedValues', changedValues, allValues);
    if (allValues['goods_type'] === 'G1') {
      return {
        ...allValues,
        display_scale: '1',
      };
    }
    return allValues;
  }
  getInitialValue() {
    return {
      goods_type: 'G1',
      border_radius_type: 'straight',
      goods_style: 'NO_BORDER_BG_WHITE',
      image_fill_style: 'cover',
      display_scale: '1',
      text_style_type: 'normal',
      text_align_type: 'left',
      page_margin: 15,
      goods_margin: 10,
      show_goods_name: true,
      show_goods_desc: true,
      show_goods_price: true,
      show_mark_price: true,
      show_corner_mark: true,
      buy_btn: true,
      nav_style: '1',
      sticky: '0',
      buy_btn_express: {
        btnType: 'cart1',
      },
    };
  }
}

GoodsLayout.info = {
  icon: require('../../icons/goods.png'),
  name: '商品',
  description: '小程序仅支持显示实物（含分销）、虚拟、电子卡券商品',
  cmpType: SysComponents.GoodsLayout,
  maxNum: 100,
  usedNum: 0,
  status: '',
};
registerEditor(GoodsLayout);
export default GoodsLayout;
