import { SysComponents } from '@sceditor/core';
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import { BaseSchemaEditor, ProFormColumnsType, registerEditor } from '@sceditor/editor-core';
import { getSchemaTpl } from '../tpl';


class Search extends BaseSchemaEditor {
  // cmpType: string = 'Search';
  // cmpName: string = '商品搜索';
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '显示位置',
      dataIndex: 'position_type',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          {
            text: '正常模式',
            value: 'normal',
            icon: 'deco-icon-search-normal',
          },
          {
            text: '滚动至顶部固定',
            value: 'sticky',
            icon: 'deco-icon-search-sticky',
          },
        ],
      },
    },
    {
      title: '展示模式',
      dataIndex: 'position_show_method',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          { text: '常驻模式', value: 'fixed', icon: 'deco-icon-search-fixed' },
          {
            text: '上滑消失下滑出现',
            value: 'scroll',
            icon: 'deco-icon-search-scroll',
          },
        ],
      },
    },
    {
      title: '框体样式',
      dataIndex: 'border_style_method',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          { text: '方形', value: 'square', icon: 'deco-icon-search-square' },
          { text: '圆形', value: 'round', icon: 'deco-icon-search-round' },
        ],
      },
    },
    {
      title: '文本位置',
      dataIndex: 'text_align',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          { text: '居左', value: 'left', icon: 'deco-icon-align-left' },
          { text: '居中', value: 'center', icon: 'deco-icon-align-center' },
        ],
      },
    },
    {
      title: '框体高度',
      valueType: 'VdSlider',
      dataIndex: 'height',
      fieldProps: {
        min: 28,
        max: 60,
      },
    },
   getSchemaTpl('color', {

    dataIndex: 'background_color',
    title: '背景颜色',
    fieldProps: {
      defaultColor: '#F9F9F9',
    },
  }),
    getSchemaTpl('color',{

      dataIndex: 'border_style_color',
      title: '框体颜色',
      fieldProps: {
        defaultColor: '#FFFFFF',
      },
    }),
    getSchemaTpl('color',{

      dataIndex: 'text_color',
      title: '文本颜色',
      fieldProps: {
        defaultColor: '#969799',
      },
    }),
  ];

  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it: any) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (
          record['position_type'] === 'normal' &&
          dataIndex === 'position_show_method'
        ) {
          return null;
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
  }
  getInitialValue() {
    return {
      background_color: '#f9f9f9',
      position_type: 'normal',
      position_show_method: 'fixed',
      border_style_method: 'round',
      border_style_color: '#fff',
      text_color: '#969799',
      text_align: 'left',
      height: 40,
    };
  }
}

Search.info = {
  icon: require('../../icons/search.png'),
  name: '商品搜索',
  description: '搜索热词和更多相关配置项请前往配置',
  cmpType: SysComponents.Search,
  maxNum: 2,
  usedNum: 0,
  status: '',
};
registerEditor(Search)
export default Search;
