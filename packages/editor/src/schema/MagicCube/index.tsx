import { VdProFormColumnsType } from '../../interface';
import { SysComponents } from '@sceditor/core';
import {
  BaseSchemaEditor,
  ProFormColumnsType,
  registerEditor,
} from '@sceditor/editor-core';

class MagicCube extends BaseSchemaEditor {
  // cmpType: string = 'MagicCube';
  // cmpName: string = '魔方';
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '魔方布局',
      valueType: 'VdMagicCubeLayout',
      dataIndex: 'layout',
      fieldProps: {
        templateDataIndex: 'show_method',
      },
      formItemProps: {
        rules: [
          ({}) => ({
            type: 'object',
            validator(rule, value, callback) {
              if (
                value != null &&
                Array.isArray(value.sub_entry) &&
                value.sub_entry.length > 0
              ) {
                let errorFlag = false;
                value.sub_entry.forEach((it: { image_url: any }) => {
                  if (it.image_url == null || it.image_url == '') {
                    errorFlag = true;
                  }
                });
                if (errorFlag) {
                  callback('请添加图片');
                } else {
                  // return Promise.resolve();
                  callback();
                }
              } else {
                // return Promise.reject(new Error('请选定布局区域大小'));
                callback('请选定布局区域大小');
              }
            },
          }),
        ],
      },
    },
    {
      title: '选择模板',
      dataIndex: 'show_method',
      valueType: 'VdRadioIcon',
      fieldProps: {
        block: true,
        options: [
          {
            text: '一行二个',
            value: '0',
            icon: 'deco-icon-cuberow',
          },
          {
            text: '一行三个',
            value: '1',
            icon: 'deco-icon-cuberow2',
          },
          {
            text: '一行四个',
            value: '2',
            icon: 'deco-icon-cuberow1',
          },
          {
            text: '二左二右',
            value: '3',
            icon: 'deco-icon-cube',
          },
          {
            text: '一左二右',
            value: '4',
            icon: 'deco-icon-cubeto',
          },
          {
            text: '一上二下',
            value: '5',
            icon: 'deco-icon-cube-upto',
          },
          {
            text: '一左三右',
            value: '6',
            icon: 'deco-icon-cubeto1',
          },
          {
            text: '自定义',
            value: '7',
            icon: 'deco-icon-cube-custom',
          },
        ],
      },
    },
    {
      title: '图片间距',
      valueType: 'VdSlider',
      dataIndex: 'gutter',
      fieldProps: {
        max: 30,
      },
    },
    {
      title: '页面间距',
      valueType: 'VdSlider',
      dataIndex: 'page_margin',
      fieldProps: {
        max: 30,
      },
    },
  ];

  getPropsConfig(columns: ProFormColumnsType[], record: any) {
    return columns;
  }
  getInitialValue() {
    return {
      page_margin: 0,
      gutter: 0,
      layout: {
        width: 2,
        height: 1,
        sub_entry: [
          { x: 0, y: 0, width: 1, height: 1 },
          { x: 1, y: 0, width: 1, height: 1 },
        ],
      },
      show_method: '0',
    };
  }
}

MagicCube.info = {
  icon: require('../../icons/magiccube.png'),
  name: '魔方',
  description: '魔方',
  cmpType: SysComponents.MagicCube,
  maxNum: 200,
  usedNum: 0,
  status: '',
};
registerEditor(MagicCube);
export default MagicCube;
