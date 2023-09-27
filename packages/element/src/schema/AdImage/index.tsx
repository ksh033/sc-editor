import { ProFormColumnsType } from '@ant-design/pro-form';
import ParentSchemCmp from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import propsConfig from './list';
import {components,SysComponents} from "@sceditor/cmp-center"
@components(SysComponents.AdImage,'图片广告')
class AdImage extends ParentSchemCmp {

  // public cmpType: string = 'AdImage';
  // public cmpName: string = '图片广告';
  propsConfig: VdProFormColumnsType[] = propsConfig;
  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (
          record['show_method'] !== 'scroll' &&
          (dataIndex === 'count' || dataIndex === 'line')
        ) {
          return null;
        }
        if (
          record['show_method'] !== 'swiper' &&
          (dataIndex === 'indicator' || dataIndex === 'image_fill_style')
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
      show_method: 'single',
      image_style: 'normal',
      corner_type: 'straight',
      indicator: '1',
      page_margin: 0,
      image_fill_style: 'cover',
      count: 1,
      list: [],
    };
  }
}

AdImage.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/Fgyd5N9R29QGAJXE7daGUWFpdv5z.png',
  name: '图片广告',
  description: '图片广告',
  cmpType: 'AdImage',
  maxNum: 300,
  usedNum: 0,
  status: '',
};
export default AdImage;
