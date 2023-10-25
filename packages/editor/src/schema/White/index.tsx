
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import { SysComponents, } from '@sceditor/core';
import { BaseSchemaEditor, ProFormColumnsType, registerEditor } from '@sceditor/editor-core';
import { getSchemaTpl } from '../tpl';

class White extends BaseSchemaEditor {
  // cmpType: string = 'White';
  // cmpName: string = '辅助空白';
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '分割类型',
      dataIndex: 'type',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          { text: '辅助空白', value: 'white', icon: 'deco-icon-white' },
          { text: '辅助线', value: 'line', icon: 'deco-icon-line' },
        ],
      },
    },
    {
      title: '选择样式',
      dataIndex: 'line_type',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          { text: '实线', value: 'solid', icon: 'deco-icon-line-solid' },
          { text: '虚线', value: 'dashed', icon: 'deco-icon-line-dashed' },
          { text: '点线', value: 'dotted', icon: 'deco-icon-line-dotted' },
        ],
      },
    },
    {
      title: '左右边距',
      dataIndex: 'has_padding',
      valueType: 'VdRadioIcon',
      fieldProps: {
        options: [
          { text: '无边距', value: '0', icon: 'deco-icon-line-no-padding' },
          { text: '左右留边', value: '1', icon: 'deco-icon-line-padding' },
        ],
      },
    },
    getSchemaTpl('color',{

      dataIndex: 'color',
      title: '辅助线颜色',
      fieldProps: {
        defaultColor: '#e5e5e5',
      },
    })
    ,
    {
      title: '空白高度',
      valueType: 'VdSlider',
      dataIndex: 'height',
      fieldProps: {
        max: 100,
        min: 8,
      },
    },
  ];

  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it: any) => {
        const dataIndex = spellNamePath(it.dataIndex);
        const whiteSet = new Set(['line_type', 'has_padding', 'color']);
        if (record['type'] === 'white' && whiteSet.has(dataIndex)) {
          return null;
        }
        if (record['type'] === 'line' && dataIndex === 'height') {
          return null;
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
  }
  getInitialValue() {
    return {
      height: 30,
      type: 'white',
      line_type: 'solid',
      has_padding: '0',
      color: '#e5e5e5',
    };
  }
}

White.info = {
  icon: require('../../icons/white.png'),
  name: '辅助分割',
  cmpType: SysComponents.White,
  maxNum: 50,
  usedNum: 0,
  status: '',
};
registerEditor(White)
export default White;
