import type { SketchPickerProps } from '@chenshuai2144/sketch-color';
import { SketchPicker } from '@chenshuai2144/sketch-color';
import { Button, Popover, PopoverProps, Space } from 'antd';
import useMergedState from 'rc-util/es/hooks/useMergedState';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';
import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';

export type VdColorProps = SketchPickerProps &
  ExtendVdFormItemProps & {
    value?: string;
    defaultColor: string;
    popoverProps?: PopoverProps;
    onChange?: (color: string) => void;
    colors?: string[];
  };

export const DEFAULT_COLORS = [
  '#FF9D4E', // 0 - 橘黄色
  '#5BD8A6', // 1 - 绿色
  '#5B8FF9', // 2 - 蓝色
  '#F7664E', // 3 - 红色
  '#FF86B7', // 4 - 水红色
  '#2B9E9D', // 5 - 墨绿色
  '#9270CA', // 6 - 紫色
  '#6DC8EC', // 7 - 浅蓝色
  '#667796', // 8 - 黛蓝色
  '#F6BD16', // 9 - 黄色
];

const VdColor: EditorPropertyComponent<VdColorProps> = (props) => {
  const { formItem, popoverProps, defaultColor = '#1890ff', ...rest } = props;

  const [color, setColor] = useMergedState(defaultColor, {
    value: props.value,
    onChange: props.onChange,
  });
  const handleClick = () => {
    setColor(defaultColor);
  };

  const readDom = (
    <div
      style={{
        padding: 5,
        width: 48,
        border: '1px solid #ddd',
        borderRadius: '2px',
        cursor: 'pointer',
      }}
    >
      <div
        style={{
          backgroundColor: color,
          width: 36,
          height: 14,
          borderRadius: '2px',
        }}
      />
    </div>
  );

  return (
    <VdFormItem
      formItem={formItem}
      valueName={color === 'transparent' ? '透明色' : color}
    >
      <Space>
        <Button type="link" onClick={handleClick}>
          重置
        </Button>
        <Popover
          trigger="click"
          placement="right"
          {...popoverProps}
          content={
            <div
              style={{
                margin: '-12px -16px',
              }}
            >
              <SketchPicker
                {...rest}
                presetColors={
                  rest.colors || rest.presetColors || DEFAULT_COLORS
                }
                color={color}
                onChange={({ hex, rgb: { r, g, b, a } }) => {
                  if (a && a < 1) {
                    setColor(`rgba(${r}, ${g}, ${b}, ${a})`);
                  }
                  setColor(hex);
                }}
              />
            </div>
          }
        >
          {readDom}
        </Popover>
      </Space>
    </VdFormItem>
  );
};
VdColor.valueType="VdColor"
registerEditorAttrCmp(VdColor)
export default VdColor;
