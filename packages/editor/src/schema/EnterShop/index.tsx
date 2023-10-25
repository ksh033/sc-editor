import { registerEditor ,  BaseSchemaEditor} from '@sceditor/editor-core';
import {SysComponents} from "@sceditor/core"
import { VdProFormColumnsType } from '../../interface';


class EnterShop extends BaseSchemaEditor {
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

  icon: require('../../icons/entershop.png'),
  name: '进入店铺',
  cmpType: SysComponents.EnterShop,
  maxNum: 1,
  usedNum: 0,
  status: '',
};
registerEditor(EnterShop)
export default EnterShop;
