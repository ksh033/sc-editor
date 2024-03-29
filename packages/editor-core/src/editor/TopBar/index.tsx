// @ts-ignore
import { ComponentSchemaProps } from '@sceditor/element';
import { Button, message } from 'antd';
import { observer } from 'mobx-react-lite';
import * as React from 'react';
import { useStore } from '../../stores';
// import { filterPageConfig } from '../../utils/common';

const PropertyPanel: React.FC<any> = () => {
  const { editorStore } = useStore();

  const editList = editorStore.editList;
  const handleClick = async () => {
    let flag = true;
    if (Array.isArray(editList)) {
      for (let i = 0; i < editList.length; i++) {
        const item: ComponentSchemaProps = editList[i];
        console.log(item);
        // const newItem = new item();
        let itemFlag = false;
        if (item.getRuleCheck) {
          itemFlag = await item.getRuleCheck();
        }
        if (flag && itemFlag === false) {
          flag = false;
          editorStore.updeteEditListItem({
            ...item,
            immediatelyCheck: true,
          });
          editorStore.switchEditCmp(item.id, true);
          break;
        }
      }
    }
    if (flag) {
      message.success('保存成功');
    }
  };

  return (
    <div className="top-bar">
      <div>微页面</div>
      <div>
        <Button type="primary" onClick={handleClick}>
          保存
        </Button>
      </div>
    </div>
  );
};
export default observer(PropertyPanel);
