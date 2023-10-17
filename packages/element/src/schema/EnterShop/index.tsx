import { registerEditor } from '@sceditor/editor-core';
import ParentSchemCmp from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
import {SysComponents} from "@sceditor/cmp-center"

class EnterShop extends ParentSchemCmp {
  // cmpType: string = 'EnterShop';
  // cmpName: string = '进入店铺';
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
      action_text: '进入店铺',
    };
  }
}

EnterShop.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/Fi8Zam5inptsK9I4E2TDKsFoZCNq.png',
  name: '进入店铺',
  cmpType: SysComponents.EnterShop,
  maxNum: 1,
  usedNum: 0,
  status: '',
};
registerEditor(EnterShop)
export default EnterShop;
