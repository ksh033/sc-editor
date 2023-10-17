import { Select, SelectProps } from 'antd';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';
import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';

type VdSelectProps = SelectProps & ExtendVdFormItemProps;

const VdSelect: EditorPropertyComponent<VdSelectProps> = (props) => {
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
