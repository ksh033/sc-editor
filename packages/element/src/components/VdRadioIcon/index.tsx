import { Button, RadioGroupProps, Tooltip } from 'antd';
import classnames from 'classnames';
import React, { Fragment, useMemo } from 'react';
import VdFormItem, { ExtendVdFormItemProps } from '../VdFormItem';
import VdIcon from '../VdIcon';
import './index.less';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';

type VdRadioOption = {
  value: string | number;
  text?: string;
  icon?: string;
  fontSize?: string | number;
  disabled?: boolean;
};

export type VdRadioIconProps = Omit<RadioGroupProps, 'onChange' | 'options'> &
  ExtendVdFormItemProps & {
    lineBlock?: boolean;
    /** button 按钮模式  image 图片模式*/
    type?: 'button' | 'image';
    onChange?: (value: string | number) => void;
    options?: VdRadioOption[];

    disabled?: boolean;
  };

const VdRadioIcon: SysEditorPropertyComponent<VdRadioIconProps> = (props) => {
  const {
    onChange,
    value,
    options = [],
    formItem,
    block = false,
    lineBlock = false,
    showValue = true,
    disabled = false,
    type = 'button',
    styles = {},
  } = props;
  const valueMap = useMemo(() => {
    const map = new Map();
    if (Array.isArray(options)) {
      options.forEach((it: any) => {
        map.set(it.value, it.text);
      });
    }
    return map;
  }, [JSON.stringify(options)]);

  const style: React.CSSProperties = useMemo(() => {
    if (lineBlock) {
      return {
        width: Math.floor(100 / options.length) + '%',
      };
    }
    return {};
  }, [lineBlock, options.length]);

  /** 按钮处理 */
  const buttonRender = (list: VdRadioOption[]) => {
    return list.map((it: VdRadioOption, index) => {
      return (
        <Fragment key={index}>
          <Tooltip
            title={it.text}
            key={`tooltip-${it.value}`}
            placement="bottom"
            color="#fff"
            mouseLeaveDelay={0.01}
            overlayInnerStyle={{
              color: '#323233',
            }}
            trigger={['hover', 'click']}
          >
            <Button
              className={[
                'deco-radio-button',
                it.value === value ? 'deco-radio-button--active' : '',
              ].join(' ')}
              value={it.value}
              key={it.value}
              disabled={disabled || it.disabled}
              style={style}
              onClick={() => {
                onChange?.(it.value);
              }}
            >
              {it.icon ? (
                React.isValidElement(it.icon) ? (
                  React.cloneElement<any>(it.icon, {
                    style: style,
                  })
                ) : (
                  <VdIcon
                    type={it.icon}
                    style={{
                      fontSize: it.fontSize || '20px',
                    }}
                  ></VdIcon>
                )
              ) : (
                <span className="deco-radio-text">{it.text}</span>
              )}
            </Button>
          </Tooltip>
        </Fragment>
      );
    });
  };
  /** 图片模式 */
  const imageRender = (list: VdRadioOption[]) => {
    return (
      <div className="select-template">
        {list.map((it: VdRadioOption, index) => {
          return (
            <div
              className="select-template-item"
              key={`template-image-${index}`}
              onClick={() => {
                if (disabled || it.disabled) {
                  return;
                }
                onChange?.(it.value);
              }}
            >
              <div
                className={classnames('select-template-item-img', {
                  'image-active': it.value === value,
                })}
              >
                {it.icon &&
                  (React.isValidElement(it.icon) ? (
                    React.cloneElement<any>(it.icon, {
                      style: style,
                    })
                  ) : (
                    <VdIcon
                      type={it.icon}
                      style={{
                        fontSize: it.fontSize || '20px',
                      }}
                    ></VdIcon>
                  ))}
              </div>

              <div
                className={classnames('select-template-text', {
                  'text-active': it.value === value,
                })}
              >
                {it.text}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <VdFormItem
      formItem={formItem}
      valueName={valueMap.get(value) ? valueMap.get(value) : ''}
      showValue={showValue}
      block={block}
      styles={styles}
    >
      <div className="deco-radio-button-group">
        {type === 'button' ? buttonRender(options) : imageRender(options)}
      </div>
    </VdFormItem>
  );
};
VdRadioIcon.valueType="VdRadioIcon"
registerEditorAttrCmp(VdRadioIcon)
export default VdRadioIcon;
