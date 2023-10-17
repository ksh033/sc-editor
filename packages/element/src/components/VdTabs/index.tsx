import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';
import { Tabs } from 'antd';



const VdTabs: EditorPropertyComponent<any> = (props: any) => {
  const { options = [], onChange, value } = props;
  const { TabPane } = Tabs;
  return (
    <div style={{ marginTop: '-12px' }}>
      <Tabs centered onChange={onChange} activeKey={value}>
        {options.map((it: any) => {
          return <TabPane tab={it.text} key={it.value}></TabPane>;
        })}
      </Tabs>
    </div>
  );
};
VdTabs.valueType="VdTabs"
registerEditorAttrCmp(VdTabs)
export default VdTabs;
