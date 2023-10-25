import { VdProFormColumnsType } from '../../interface';
import {BaseSchemaEditor,registerEditor,type ProFormColumnsType} from '@sceditor/editor-core';
import { spellNamePath } from '../../utils';
import propsConfig from './list';
import { imageRule, textImageRule, textRule } from './rules';

const getPropsConfig = (columns: ProFormColumnsType<any>[], record: any) => {
  const newC: any[] = columns
    .map((it: any) => {
      if (Array.isArray(it.columns) && it.columns.length > 0) {
        it.columns = getPropsConfig(it.columns, record);
      } else {
        const dataIndex = spellNamePath(it.dataIndex);

        if (dataIndex === 'sub_entry') {
          const subMap: Record<string, any> = {
            text: {
              ...it,
              formItemProps: {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '请添加图文广告',
                  },
                  textRule,
                ],
              },
            },
            imageText: {
              ...it,
              formItemProps: {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '请添加图文广告',
                  },
                  textImageRule,
                ],
              },
            },
            image: {
              ...it,
              formItemProps: {
                rules: [
                  {
                    type: 'array',
                    required: true,
                    message: '请添加图文广告',
                  },
                  imageRule,
                ],
              },
            },
          };

          return subMap[record['show_method'] || '']
            ? subMap[record['show_method'] || '']
            : it;
        }

        if (dataIndex === 'border_color') {
          const textMap: Record<string, string> = {
            underline: '下划线颜色',
            box: '方框颜色',
            round: '圆框颜色',
            background: '背景颜色-选中状态',
          };
          const navigation_type = record['navigation_type'] as string;
          return {
            ...it,
            fieldProps: {
              ...it.fieldProps,
              formItem: {
                ...it.fieldProps.formItem,
                label: textMap[navigation_type],
              },
            },
          };
        }
      }
      return it;
    })
    .filter((it) => {
      const dataIndex = spellNamePath(it.dataIndex);
      if (dataIndex != null) {
        if (dataIndex === 'show_method' || dataIndex === 'sub_entry') {
          return true;
        }
        if (record['show_method'] === 'text') {
          const dataIndexList = [
            'slide_setting',
            'navigation_type',
            'font_default_color',
            'font_active_color',
            'border_color',
            'background_color',
          ];
          if (!dataIndexList.includes(dataIndex)) {
            return false;
          }
        }
        if (record['show_method'] === 'imageText') {
          const dataIndexList = [
            'font_default_color',
            'font_active_color',
            'background_color',
          ];
          if (!dataIndexList.includes(dataIndex)) {
            return false;
          }
        }
        if (record['show_method'] === 'image') {
          const dataIndexList = ['background_color'];
          if (!dataIndexList.includes(dataIndex)) {
            return false;
          }
        }
      }

      return true;
    });
  return newC;
};
import {SysComponents} from "@sceditor/core"

class ElevatorNav extends BaseSchemaEditor {
  // cmpType: string = 'ElevatorNav';
  // cmpName: string = '电梯导航';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  getPropsConfig = getPropsConfig;
  getInitialValue() {
    return {
      show_method: 'text',
      slide_setting: 'scroll',
      sub_entry: [
        { title: '导航一', key: '1' },
        { title: '导航二', key: '2' },
        { title: '导航三', key: '2' },
        { title: '导航四', key: '2' },
      ],
      navigation_type: 'underline',
      font_default_color: '#969799',
      font_active_color: '#323233',
      background_color: '#FFFFFF',
      border_color: '#EE0A24',
    };
  }
}

ElevatorNav.info = {
  icon: require('../../icons/elevatornav.png'),
  name: '电梯导航',
  description: '只能选择当前组件下方的组件进行定位',
  cmpType: SysComponents.ElevatorNav,
  maxNum: 1,
  usedNum: 0,
  status: '',
};
registerEditor(ElevatorNav)
export default ElevatorNav;
