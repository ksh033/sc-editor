import { VdProFormColumnsType } from '../../interface';
import { ProFormColumnsType } from '@ant-design/pro-form';
import propsConfig from './list';
import { SysComponents } from '@sceditor/core';
import {
  BaseSchemaEditor,
  FormProps,
  registerEditor,
} from '@sceditor/editor-core';
import { spellNamePath } from '../../utils';
import { Key } from 'react';

/** 商品组 */
class GoodsGroup extends BaseSchemaEditor {
  // cmpType: string = 'Goods';
  // cmpName: string = '商品';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  formProps: FormProps = {
    layout: 'horizontal',
  };
  getColumItem(it: ProFormColumnsType<any, any>, record) {
    const dataIndex = it.dataIndex ? spellNamePath(it.dataIndex) : it.key;
    if (record['show_method'] === 'LEFT_NAV' && dataIndex) {
      const hiddenList: Key[] = [
        'sticky',
        'show_all_tag',
        'nav_style',
        '1',
        '2',
      ];
      if (dataIndex === 'goods-group') {
        return {
          ...it,
          fieldProps: {
            ignoreList: ['goods_type', 'goods_style'],
          },
        };
      }
      if (hiddenList.indexOf(dataIndex) > -1) {
        console.log('dataIndex');
        return null;
      }
    }
    return it;
  }
  getInitialValue() {
    return {
      nav_style: '1',
      sticky: true,
      show_all_tag: false,
      show_method: 'TOP_NAV',
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
      buy_btn_express: {
        btnType: 'cart1',
      },
    };
  }
}

GoodsGroup.info = {
  icon: require('../../icons/goodsgroup.png'),
  name: '商品组',
  cmpType: SysComponents.GoodsGroup,
  maxNum: 100,
  usedNum: 0,
  status: '',
};
registerEditor(GoodsGroup);
export default GoodsGroup;
