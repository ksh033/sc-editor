import { FormItemProps } from 'antd';
import React, { PropsWithChildren } from 'react';
import './index.less';

export type VdFormItemProps = {
  formItem?: FormItemProps;
  valueName?: React.Key | React.ReactNode;
  showValue?: boolean;
  block?: boolean;
  showFormItemTitle?: boolean;
};

export type ExtendVdFormItemProps = {
  /** formItem 的参数 */
  formItem?: FormItemProps;
  /** 是否占据一行 */
  block?: boolean;
  /** 是否显示值 */
  showValue?: boolean;
};

const VdFormItem: React.FC<PropsWithChildren<VdFormItemProps>> = (props) => {
  const {
    formItem,
    valueName,
    showValue = true,
    block = false,
    showFormItemTitle = true,
  } = props;
  return (
    <div
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
