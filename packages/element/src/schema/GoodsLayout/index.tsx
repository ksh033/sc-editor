import { ProFormColumnsType } from '@ant-design/pro-form';
import ParentSchemCmp, { FormProps } from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import propsConfig from './list';
import {components,SysComponents} from "@sceditor/cmp-center"

@components(SysComponents.GoodsLayout,'商品排版')
class GoodsLayout extends ParentSchemCmp {
  // cmpType: string = 'GoodsLayout';
  // cmpName: string = '商品';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  formProps: FormProps = {
    layout: 'horizontal',
  };
  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (record['goods_type'] === 'G1' && dataIndex === 'display_scale') {
          return {
            ...it,
            fieldProps: {
              ...it.fieldProps,
              disabled: true,
            },
          };
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
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
        btn_type: '1',
      },
    };
  }
}

GoodsLayout.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FirnSShEAotLWTHOsk21GdYa-SdX.png',
  name: '商品',
  description: '小程序仅支持显示实物（含分销）、虚拟、电子卡券商品',
  cmpType: 'GoodsLayout',
  maxNum: 100,
  usedNum: 0,
  status: '',
};

export default GoodsLayout;
