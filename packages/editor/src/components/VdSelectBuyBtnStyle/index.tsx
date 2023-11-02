import { Fragment, useCallback, useMemo, useState } from 'react';
import { Dropdown, Input } from 'antd';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import classnames from 'classnames';
import { SysEditorPropertyComponent } from '../interface';
import VdIcon from '../VdIcon';
import VdFormItem from '../VdFormItem';
import dataMap from './btn';
import './index.less';
import { BtnType, ItemType, VdSelectBuyBtnStyleProps } from './type';

/** 购买按钮样式 */
const VdSelectBuyBtnStyle: SysEditorPropertyComponent<
  VdSelectBuyBtnStyleProps
> = (props) => {
  const {
    formItem,
    value = {
      btnType: 'fill',
    },
    onChange,
  } = props;

  const [open, setOpen] = useState<boolean>(false);

  /** 数据 */
  const list = useMemo(() => {
    return dataMap['buyBtns'];
  }, []);

  const currentValue = useMemo(() => {
    return list.find((it) => it?.key === value?.btnType);
  }, [value?.btnType]);

  const onChangeOpen = () => {
    setOpen(!open);
  };

  const onItemClick = (it: ItemType) => {
    const key = it.key as BtnType;
    setOpen(false);
    onChange?.({
      ...(value || {}),
      btnType: key,
      btnText: it.btnText,
    });
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.({
      ...(value || {}),
      btnText: e.target.value,
    });
  };

  const showBtnText = useMemo(() => {
    const has: string[] = [
      'circle-fill',
      'square-fill',
      'circle-hollow',
      'square-hollow',
    ];

    return has.indexOf(value.btnType) > -1;
  }, [value.btnType]);

  const getNoneStyle = useCallback((type: BtnType) => {
    return type === 'none' ? { color: 'rgb(153, 153, 153)' } : {};
  }, []);

  return (
    <Fragment>
      <VdFormItem formItem={formItem} showValue={false}>
        <Dropdown
          placement="bottomLeft"
          trigger={['click']}
          open={open}
          dropdownRender={() => {
            return (
              <div className="vd-panel-select-dropdown-render">
                {list.map((it: ItemType, index) => {
                  return (
                    <div
                      className={classnames('dropdown-render-item', {
                        'dropdown-render-item--active':
                          it.key === value.btnType,
                      })}
                      key={`item-${index}-${it.key}`}
                      onClick={() => {
                        onItemClick(it);
                      }}
                    >
                      {it?.icon && (
                        <VdIcon
                          type={it?.icon}
                          className="selector-icon"
                          style={getNoneStyle(it.key as BtnType)}
                        ></VdIcon>
                      )}
                      {it.label}
                    </div>
                  );
                })}
              </div>
            );
          }}
        >
          <div className="simulate-input-wrapper" onClick={onChangeOpen}>
            {currentValue ? (
              <>
                {currentValue?.icon && (
                  <VdIcon
                    type={currentValue?.icon}
                    className="selector-icon"
                    style={getNoneStyle(value.btnType)}
                  ></VdIcon>
                )}
                {currentValue?.label}
              </>
            ) : (
              '请选择'
            )}
          </div>
        </Dropdown>
      </VdFormItem>
      {showBtnText && (
        <VdFormItem
          formItem={{ label: '按钮文字' }}
          showValue={false}
          styles={{ marginTop: 24 }}
        >
          <Input
            className="buy-btn-text"
            value={value.btnText}
            onChange={onInputChange}
          ></Input>
        </VdFormItem>
      )}
    </Fragment>
  );
};

VdSelectBuyBtnStyle.valueType = 'VdSelectBuyBtnStyle';

registerEditorAttrCmp(VdSelectBuyBtnStyle);
export default VdSelectBuyBtnStyle;
