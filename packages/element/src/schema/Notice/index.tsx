import { BaseSchemaEditor, registerEditor } from '@sceditor/editor-core';
import { VdProFormColumnsType } from '../../interface';
import { SysComponents } from "@sceditor/cmp-center"
import { getSchemaTpl } from '../tpl';


class Notice extends BaseSchemaEditor {
  // cmpType: string = 'Notice';
  // cmpName: string = '公告';
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '公告',
      dataIndex: 'content',
      fieldProps: {
        placeholder: '请填写公告内容',
      },
      formItemProps: {
        className: 'deco-control-group',
        rules: [
          {
            required: true,
            message: '请填写公告内容',
          },
        ],
      },
    },
    getSchemaTpl('color', {

      dataIndex: 'background_color',
      title: '背景颜色',
      fieldProps: {
        defaultColor: '#fff8e9',
      },
    },),
    getSchemaTpl('color', {

      dataIndex: 'color',
      title: '文本颜色',
      fieldProps: {
        defaultColor: '#646566',
      },
    }),
    getSchemaTpl('color', {

      dataIndex: 'card_background_color',
      title: '卡片背景',
      fieldProps: {
        defaultColor: 'transparent',
      },
    }),
    {
      dataIndex: 'corner_type',
      title: '卡片倒角',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          {
            text: '直角',
            value: 'straight',
            icon: 'deco-icon-corner-straight',
          },
          {
            text: '圆角',
            value: 'round',
            icon: 'deco-icon-corner-round',
          },
        ],
      },
    },

    {
      dataIndex: 'has_top_bottom_margin',
      title: '上下边距',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          {
            text: '无边',
            value: false,
          },
          {
            text: '有边',
            value: true,
          },
        ],
      },
    },
    {
      title: '页面边距',
      valueType: 'VdSlider',
      dataIndex: 'page_margin',
      fieldProps: {
        max: 30,
      },
    },
  ];
  getInitialValue() {
    return {
      content: '',
      background_color: '#fff8e9',
      color: '#646566',
      page_margin: 16,
      corner_type: 'round',
      has_top_bottom_margin: true,
    };
  }
}

Notice.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FlcvwSqlns7YVxDk8Zi2yAG6oEji.png',
  name: '公告',
  cmpType: SysComponents.Notice,
  maxNum: 1,
  usedNum: 0,
  status: '',
};
registerEditor(Notice)
export default Notice;
