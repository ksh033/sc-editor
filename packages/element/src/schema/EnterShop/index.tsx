import ParentSchemCmp from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';

class EnterShop extends ParentSchemCmp {
  cmpKey: string = 'EnterShop';
  cmpName: string = '进入店铺';
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
  cmpKey: 'EnterShop',
  maxNum: 1,
  usedNum: 0,
  status: '',
};

export default EnterShop;