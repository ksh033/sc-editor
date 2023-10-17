import { VdProFormColumnsType } from '../../interface';
import {SysComponents} from "@sceditor/cmp-center"
import {BaseSchemaEditor,registerEditor} from '@sceditor/editor-core';

class CustomNav extends BaseSchemaEditor {
  // cmpType: string = 'CustomNav';
  // cmpName: string = '底部导航';
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '文案',
      dataIndex: 'action_text',
      formItemProps: {
        className: 'deco-control-group',
      },
    },
  ];
  getInitialValue() {
    return {
      action_text: '底部导航',
    };
  }
}

CustomNav.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/Fi8Zam5inptsK9I4E2TDKsFoZCNq.png',
  name: '底部导航',
  description:
    '底部导航配置“自定义链接”或“小程序路径”时，可能跳转过去的页面会没法展示底部导航',
  cmpType: SysComponents.CustomNav,
  maxNum: 1,
  usedNum: 0,
  status: '',
};
registerEditor(CustomNav)
export default CustomNav;
