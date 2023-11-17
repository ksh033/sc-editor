import { Form } from 'antd';
import { Fragment, useContext, useMemo } from 'react';
import list from './list';
import { VdProFormColumnsType } from '../../interface';
import {
  EditorContext,
  EditorPropertyContext,
  registerEditorAttrCmp,
} from '@sceditor/editor-core';
import React from 'react';
import { VdGoodsPropertyProps } from './type';
import { SysEditorPropertyComponent } from '../interface';

/** 商品属性集合 */
const VdGoodsProperty: SysEditorPropertyComponent<VdGoodsPropertyProps> = (
  props
) => {
  const { ignoreList = [] } = props;

  const editorContext = useContext(EditorContext);
  const comMap = editorContext.manager.getComponentMap();

  const editorValue = useContext(EditorPropertyContext);

  const attrFromData = useMemo(() => {
    return editorValue.attrFromData;
  }, [JSON.stringify(editorValue.attrFromData)]);

  const getFieldProps = (key, fieldProps) => {
    if (key === 'display_scale' && attrFromData['goods_type'] === 'G1') {
      return {
        ...fieldProps,
        disabled: true,
      };
    }
    return fieldProps;
  };

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
        if (it.dataIndex && ignoreList.indexOf(it.dataIndex) === -1) {
          let formItemProps = Object.assign(
            { className: 'deco-control-group' },
            it.formItemProps
          );
          let fieldProps = it.fieldProps || {};
          formItemProps = {
            ...formItemProps,
            label: undefined,
            name: it.dataIndex,
          };
          fieldProps['formItem'] = {
            name: it.dataIndex,
            label: it.title,
          };
          fieldProps = getFieldProps(it.key || it.dataIndex, fieldProps);
          const valueType = (it.valueType || '') as string;
          renderList.push(
            <Fragment key={`item-${it.key || it.dataIndex || idx}`}>
              {SingleRender(valueType, fieldProps, formItemProps)}
            </Fragment>
          );
        }
      });
    }
    return renderList;
  };
  return <Fragment>{formItemRender(list)}</Fragment>;
};

VdGoodsProperty.valueType = 'VdGoodsProperty';
registerEditorAttrCmp(VdGoodsProperty);
export default VdGoodsProperty;
