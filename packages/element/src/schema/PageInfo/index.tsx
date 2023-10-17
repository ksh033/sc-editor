import { VdProFormColumnsType } from '../../interface';
import {SysComponents} from "@sceditor/cmp-center"
import { BaseSchemaEditor, registerEditor } from '@sceditor/editor-core';


class PageInfo extends BaseSchemaEditor {
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
PageInfo.info={
  name:'页面设置',
  cmpType:SysComponents.PageInfo,
  maxNum:1,
  usedNum:1,
  status:''
}
registerEditor(PageInfo);
export default PageInfo;
