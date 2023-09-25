import { ProFormColumnsType } from '@ant-design/pro-form';
import ParentSchemCmp, { FormProps } from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import propsConfig from './list';

class ImageTextNav extends ParentSchemCmp {
  cmpType: string = 'ImageTextNav';
  cmpName: string = '图文导航';
  formProps: FormProps = {
    layout: 'horizontal',
    shouldUpdate: (newValues, oldValues) => {
      if (
        newValues &&
        oldValues &&
        newValues['show_method'] !== oldValues['show_method']
      ) {
        return true;
      }
      return false;
    },
  };
  propsConfig: VdProFormColumnsType[] = propsConfig;
  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it: any) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (record['image_fill_style'] === 'nowrap' && dataIndex === 'count') {
          return null;
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
  }
  getInitialValue() {
    return {
      show_method: 'imageText',
      image_fill_style: 'nowrap',
      sub_entry: [
        {
          image_id: '2129097438',
          image_url:
            'https://img01.yzcdn.cn/upload_files/2020/07/10/Fn22ra9wQlBQvBDJO_61hwyKZqc_.jpg',
          image_thumb_url:
            'upload_files/2020/07/10/Fn22ra9wQlBQvBDJO_61hwyKZqc_.jpg!100x100.jpg',
          image_width: 750,
          image_height: 1106,
          link_url:
            'https://shop90759155.youzan.com/wscshop/showcase/feature?alias=kTSNCfsvO5',
          title: '导航一',
        },
        {
          image_id: '2129097438',
          image_url:
            'https://img01.yzcdn.cn/upload_files/2020/07/10/Fn22ra9wQlBQvBDJO_61hwyKZqc_.jpg',
          image_thumb_url:
            'upload_files/2020/07/10/Fn22ra9wQlBQvBDJO_61hwyKZqc_.jpg!100x100.jpg',
          image_width: 750,
          image_height: 1106,
          link_url:
            'https://shop90759155.youzan.com/wscshop/showcase/feature?alias=kTSNCfsvO5',
          title: '导航二',
        },
      ],
      background_color: '#fff',
      font_color: '#000',
      count: 4,
    };
  }
}

ImageTextNav.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FnCMmkIRcBPKq5oeY8kX7lq_7hk4.png',
  name: '图文导航',
  description: '图文导航',
  cmpType: 'ImageTextNav',
  maxNum: 10,
  usedNum: 0,
  status: '',
};

export default ImageTextNav;
