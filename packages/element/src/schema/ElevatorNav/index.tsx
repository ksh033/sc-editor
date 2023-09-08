import { ProFormColumnsType } from '@ant-design/pro-form';
import ParentSchemCmp from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
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
        if (record['show_method'] === 'text' && dataIndex === 'sub_entry') {
          return {
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
          };
        }
        if (
          record['show_method'] === 'imageText' &&
          dataIndex === 'sub_entry'
        ) {
          return {
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
          };
        }
        if (record['show_method'] === 'image' && dataIndex === 'sub_entry') {
          return {
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
          };
        }
      }
      return it;
    })
    .filter((it) => it != null);
  return newC;
};

class ElevatorNav extends ParentSchemCmp {
  cmpKey: string = 'ElevatorNav';
  cmpName: string = '电梯导航';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  getPropsConfig = getPropsConfig;
  getInitialValue() {
    return {
      show_method: 'text',
      slide_setting: 'scroll',
      sub_entry: [],
      navigation_type: 'underline',
      font_default_color: '#969799',
      font_active_color: '#323233',
      background_color: '#FFFFFF',
      border_color: '#EE0A24',
    };
  }
}

ElevatorNav.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/Fpy_YxZ69hGiYl-SUDkDn7Sz2sNH.png',
  name: '电梯导航',
  description: '只能选择当前组件下方的组件进行定位',
  cmpKey: 'ElevatorNav',
  maxNum: 1,
  usedNum: 0,
  status: '',
};

export default ElevatorNav;
