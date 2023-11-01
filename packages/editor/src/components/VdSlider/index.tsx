import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';
import { InputNumber, Slider, SliderSingleProps, Space } from 'antd';
import './index.less';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';
import { useEffect, useState } from 'react';

export type VdSliderProps = SliderSingleProps & ExtendVdFormItemProps;

const VdSlider: SysEditorPropertyComponent<VdSliderProps> = (props) => {
  const {
    formItem,
    min = 0,
    max = 60,
    defaultValue = 0,
    value,
    onChange,
    ...rest
  } = props;

  // const [inputValue, setInputValue] = useMergedState(defaultValue, {
  //   value: value,
  //   onChange: onChange,
  // });

  const [inputValue, setInputValue] = useState<number>(defaultValue);
  const handleChange = (val: any) => {
    setInputValue(val);
    onChange?.(val);
  };

  useEffect(() => {
    if (value && value !== inputValue) {
      setInputValue(value);
    }
  }, [value, inputValue]);

  return (
    <VdFormItem formItem={formItem} showValue={false}>
      <Space>
        <Slider
          min={min}
          max={max}
          style={{ width: '200px' }}
          {...rest}
          onChange={handleChange}
          value={Number(inputValue)}
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
VdSlider.valueType = 'VdSlider';
registerEditorAttrCmp(VdSlider);
export default VdSlider;
