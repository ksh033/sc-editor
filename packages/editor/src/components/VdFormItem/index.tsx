import type { FormItemProps } from 'antd';
import React, { PropsWithChildren } from 'react';
import './index.less';

export type VdFormItemProps = {
  formItem?: FormItemProps;
  valueName?: React.ReactNode;
  showValue?: boolean;
  block?: boolean;
  showFormItemTitle?: boolean;
  styles?: React.CSSProperties;
};

export type ExtendVdFormItemProps = {
  /** formItem 的参数 */
  formItem?: FormItemProps;
  /** 是否占据一行 */
  block?: boolean;
  /** 是否显示值 */
  showValue?: boolean;
  styles?: React.CSSProperties;
};

const VdFormItem: React.FC<PropsWithChildren<VdFormItemProps>> = (props) => {
  const {
    formItem,
    valueName,
    showValue = true,
    block = false,
    showFormItemTitle = true,
    styles = {},
  } = props;
  return (
    <div
      style={styles}
      className={
        block
          ? 'vd-component-warp vd-component-warp-block'
          : 'vd-component-warp'
      }
    >
      <div className="vd-component-warp-header">
        <span className="vd-component-warp__label">
          {showFormItemTitle ? formItem?.label || '' : ''}
        </span>
        {showValue ? (
          <span className="vd-component-warp__value">{valueName}</span>
        ) : null}
      </div>
      <div className="vd-component-warp-content">{props.children}</div>
    </div>
  );
};

export default VdFormItem;
