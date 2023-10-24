import { Select, SelectProps } from 'antd';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';

type VdSelectProps = SelectProps & ExtendVdFormItemProps;

const VdSelect: SysEditorPropertyComponent<VdSelectProps> = (props) => {
  const { formItem, options = [], value, onChange, block = false } = props;
  console.log('formItem', formItem);
  return (
    <VdFormItem formItem={formItem} showValue={false} block={block}>
      <Select
        options={options}
        style={{ width: '240px' }}
        value={value}
        onChange={onChange}
      ></Select>
    </VdFormItem>
  );
};
VdSelect.valueType="VdSelect"
registerEditorAttrCmp(VdSelect)
export default VdSelect;
