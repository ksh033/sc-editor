import { VdProFormColumnsType } from '../../interface';
import ParentSchemCmp from '../../base/ParentSchemCmp';
import {components,SysComponents} from "@sceditor/cmp-center"

@components(SysComponents.PageInfo,'页面设置')
class PageInfo extends ParentSchemCmp {
  // cmpName = '页面设置';
  // cmpType: string = 'PAGE-SETTING';
  id = 'page-setting';
 
  propsConfig: VdProFormColumnsType<any>[] = [
    {
      title: '页面名称',
      dataIndex: 'pageName',
    },
    {
      title: '页面描述',
      dataIndex: 'pageDesc',
      fieldProps: {
        placeholder: '用户通过微信分享给朋友时，会自动显示页面描述',
      },
    },
  ];
  values: any = {};
  constructor() {
    super();
    this.values = this.getInitialValue();
  }

  getInitialValue() {
    return {
      pageName: '微页面标题',
    };
  }
}

export default PageInfo;
