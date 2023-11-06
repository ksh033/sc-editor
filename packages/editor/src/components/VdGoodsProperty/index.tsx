import { Form } from 'antd';
import { Fragment, useContext } from 'react';
import list from './list';
import { VdProFormColumnsType } from '../../interface';
import { EditorContext, registerEditorAttrCmp } from '@sceditor/editor-core';
import React from 'react';

/** 商品属性集合 */
const VdGoodsProperty = () => {
  const editorContext = useContext(EditorContext);
  const comMap = editorContext.manager.getComponentMap();

  const SingleRender = (
    valueType: string,
    fieldProps,
    formItemProps
  ): React.ReactNode => {
    const WarpCommponent = comMap[valueType];
    if (WarpCommponent) {
      return (
        <Form.Item {...formItemProps}>
          {React.createElement(WarpCommponent, {
            ...fieldProps,
          })}
        </Form.Item>
      );
    }
    return null;
  };

  const formItemRender = (list: VdProFormColumnsType[]) => {
    const renderList: React.ReactNode[] = [];
    if (Array.isArray(list)) {
      list.forEach((it: VdProFormColumnsType, idx) => {
        let formItemProps = Object.assign(
          { className: 'deco-control-group' },
          it.formItemProps
        );
        const fieldProps = it.fieldProps || {};
        formItemProps = {
          ...formItemProps,
          label: undefined,
          name: it.dataIndex,
        };
        fieldProps['formItem'] = {
          name: it.dataIndex,
          label: it.title,
        };
        const valueType = (it.valueType || '') as string;
        renderList.push(
          <Fragment key={`item-${it.key || it.dataIndex || idx}`}>
            {SingleRender(valueType, fieldProps, formItemProps)}
          </Fragment>
        );
      });
    }
    return renderList;
  };
  return <Fragment>{formItemRender(list)}</Fragment>;
};

VdGoodsProperty.valueType = 'VdGoodsProperty';
registerEditorAttrCmp(VdGoodsProperty);
export default VdGoodsProperty;
