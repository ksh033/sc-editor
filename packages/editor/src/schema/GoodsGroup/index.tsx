// import ParentSchemCmp, { FormProps } from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
import { ProFormColumnsType } from '@ant-design/pro-form';
import propsConfig from './list';
import { spellNamePath } from '../../utils';
import GroupTitle from '../../components/VdGoodsGroup/GroupTitle';
import { SysComponents } from '@sceditor/core';
import {
  BaseSchemaEditor,
  FormProps,
  registerEditor,
} from '@sceditor/editor-core';

/** 商品组 */
class GoodsGroup extends BaseSchemaEditor {
  // cmpType: string = 'Goods';
  // cmpName: string = '商品';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  formProps: FormProps = {
    layout: 'horizontal',
  };
  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const goodsColumns = ['goods_from', 'goods', 'sub_entry'];
    const goodsGroup = [
      'line',
      'tag_list_template',
      'is_show_all',
      'nav_style',
      'sticky',
    ];
    const newC: any[] = columns
      .map((it) => {
        const dataIndex = spellNamePath(it.dataIndex);
        const showGroupIndex = goodsGroup.indexOf(dataIndex) > -1;
        if (goodsColumns.indexOf(dataIndex) > -1 || showGroupIndex) {
          if (record.type === 'goods') {
            if (dataIndex === 'goods_from') {
              return it;
            }
            if (record['goods_from'] === '0' && dataIndex === 'goods') {
              return {
                ...it,
                formItemProps: {
                  className: 'deco-control-style-group',
                  style: {
                    marginBottom: '24px',
                  },
                  required: false,
                  rules: [
                    {
                      required: true,
                      message: '请添加商品',
                      type: 'array',
                    },
                  ],
                },
              };
            }

            if (record['goods_from'] === '1' && dataIndex === 'sub_entry') {
              return {
                ...it,
                fieldProps: {
                  max: 1,
                  type: 'tag',
                },
              };
            }
            if (showGroupIndex) {
              return null;
            }
          } else {
            if (dataIndex === 'sub_entry') {
              return {
                ...it,
                fieldProps: {
                  max: 15,
                  groupTitle: () => {
                    return <GroupTitle></GroupTitle>;
                  },
                },
              };
            }
            if (showGroupIndex) {
              return it;
            }
          }
          return null;
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
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
