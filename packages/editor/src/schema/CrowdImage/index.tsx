import { ProFormColumnsType } from '@ant-design/pro-form';
import {BaseSchemaEditor,registerEditor} from '@sceditor/editor-core';

import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import propsConfig from './list';
import { SysComponents } from '@sceditor/core';

class CrowdImage extends BaseSchemaEditor {
  // cmpType: string = 'CrowdImage';
  // cmpName: string = '人群图片';
  propsConfig: VdProFormColumnsType[] = propsConfig;

  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (record['show_method'] !== 'swiper' && dataIndex === 'indicator') {
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

CrowdImage.info = {
  icon: require('../../icons/image.png'),
  name: '人群图片',
  description: '',
  cmpType:SysComponents.CrowdImage,
  maxNum: 1,
  usedNum: 0,
  status: '',
};

registerEditor(CrowdImage)
export default CrowdImage;
