import { getSchemaTpl } from '../tpl';
import { VdProFormColumnsType } from '../../interface';
import { textRule } from './rules';

const propsConfig: VdProFormColumnsType[] = [
  {
    title: '选择模板',
    dataIndex: 'show_method',
    valueType: 'VdRadioIcon',
    fieldProps: {
      block: true,
      lineBlock: true,
      options: [
        {
          text: '文字型',
          value: 'text',
          icon: 'deco-icon-font-double',
        },
        {
          text: '图文型',
          value: 'imageText',
          icon: 'deco-icon-img-text',
        },
        {
          text: '图片型',
          value: 'image',
          icon: 'deco-icon-img',
        },
      ],
    },
  },
  {
    valueType: 'divider',
  },
  {
    title: '添加标签',
    valueType: 'group',
    fieldProps: { collapsible: true, expandIconPosition: 'end' },
    columns: [
      {
        dataIndex: 'sub_entry',
        valueType: 'VdAddElevatorNav',
        formItemProps: {
          rules: [
            {
              type: 'array',
              required: true,
              message: '请添加图文广告',
            },
            {
              ...textRule,
            },
          ],
        },
      },
    ],
  },
  {
    valueType: 'divider',
  },
  {
    title: '更多设置',
    valueType: 'group',
    fieldProps: { collapsible: true, expandIconPosition: 'end' },
    columns: [
      {
        title: '展示方式',
        dataIndex: 'slide_setting',
        valueType: 'VdRadioIcon',
        fieldProps: {
          showValue: false,
          options: [
            {
              text: '下拉展示',
              value: 'select',
            },
            {
              text: '横向滚动',
              value: 'scroll',
            },
          ],
        },
      },
      {
        title: '标签样式',
        dataIndex: 'navigation_type',
        valueType: 'VdRadioIcon',
        fieldProps: {
          showValue: false,
          options: [
            {
              text: '背景模式',
              value: 'background',
            },
            {
              text: '圆框',
              value: 'round',
            },
            {
              text: '方框',
              value: 'box',
            },
            {
              text: '下划线',
              value: 'underline',
            },
          ],
        },
      },
 
      getSchemaTpl('color',{ dataIndex: 'font_default_color',
      title: '文本颜色-默认状态',
      fieldProps: {
        defaultColor: '#969799',
      }}),

      getSchemaTpl('color',{
        dataIndex: 'font_active_color',
        title: '文本颜色-选中状态',
        fieldProps: {
          defaultColor: '#e5e5e5',
        },
      })
      ,

      getSchemaTpl('color', {
   
        dataIndex: 'border_color',
        title: '圆框颜色',
        fieldProps: {
          defaultColor: '#EE0A24',
        },
      })
     ,

     getSchemaTpl('color', {
   
      dataIndex: 'background_color',
      title: '背景颜色',
      fieldProps: {
        defaultColor: '#ffffff',
      },
    })
      
    ],
  },
];

export default propsConfig;
