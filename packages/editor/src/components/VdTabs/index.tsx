import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { Tabs } from 'antd';
import type { BaseFromItemProps } from '@sceditor/core';
import { SysEditorPropertyComponent } from '../interface';

type VdTabsProps = BaseFromItemProps<any> & {
  options: any[];
};

const VdTabs: SysEditorPropertyComponent<VdTabsProps> = (props) => {
  const { options = [], onChange, value } = props;

  return (
    <div style={{ marginTop: '-12px' }}>
      <Tabs
        centered
        onChange={onChange}
        activeKey={value}
        items={options.map((it: any) => {
          return {
            key: it.value,
            label: it.text,
          };
        })}
      >
        {/* {options.map((it: any) => {
          return <TabPane  tab={it.text} key={it.value}></TabPane>;
        })} */}
      </Tabs>
    </div>
  );
};
VdTabs.valueType = 'VdTabs';
registerEditorAttrCmp(VdTabs);
export default VdTabs;
