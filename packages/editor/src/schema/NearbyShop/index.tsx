import { VdProFormColumnsType } from '../../interface'
import {SysComponents} from "@sceditor/core"
import { BaseSchemaEditor, registerEditor } from '@sceditor/editor-core'

class NearbyShop extends BaseSchemaEditor {
  // cmpType: string = 'NearbyShop'
  // cmpName: string = '附近的门店'
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '分组',
      valueType: 'group',
      columns: [
        {
          title: '状态',
          dataIndex: 'groupState',
        },
        {
          title: '标题',
          dataIndex: 'groupTitle',
        },
      ],
    },
  ]
}

NearbyShop.info = {
  icon: require('../../icons/shop.png'),
  name: '附近的门店',
  cmpType:SysComponents.NearbyShop,
  description:
    '该组件当前仅支持微信小程序（需要体验版v3.51.1版本及以上），预览或在其他渠道打开，该组件将不可见；未配置店铺情况下，该组件不可见。',
  maxNum: 1,
  usedNum: 0,
  status: '',
}
registerEditor(NearbyShop)
export default NearbyShop
