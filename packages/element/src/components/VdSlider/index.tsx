
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import { InputNumber, Slider, SliderSingleProps, Space } from 'antd';
import './index.less';
import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';

export type VdSliderProps = SliderSingleProps & ExtendVdFormItemProps;

const VdSlider: EditorPropertyComponent<VdSliderProps> = (props) => {
  const { formItem, min = 0, max = 60, defaultValue = 0, ...rest } = props;

  const [inputValue, setInputValue] = useMergedState(defaultValue, {
    value: props.value,
    onChange: props.onChange,
  });
  const handleChange = (val: any) => {
    setInputValue(val);
  };

  return (
    <VdFormItem formItem={formItem} showValue={false}>
      <Space>
        <Slider
          min={min}
          max={max}
          onChange={handleChange}
          value={typeof inputValue === 'number' ? inputValue : 0}
          style={{ width: '200px' }}
          {...rest}
        />
        <InputNumber
          min={min}
          max={max}
          value={inputValue}
          onChange={handleChange}
          style={{ width: '60px' }}
          controls={false}
        />
      </Space>
    </VdFormItem>
  );
};
VdSlider.valueType="VdSlider"
registerEditorAttrCmp(VdSlider)
export default VdSlider;
