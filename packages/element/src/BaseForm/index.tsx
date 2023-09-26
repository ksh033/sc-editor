import { BetaSchemaForm } from '@ant-design/pro-form';
import ProProvider from '@ant-design/pro-provider';
import React, { useContext } from 'react';
// @ts-ignore
import type { ProRenderFieldPropsType } from '@ant-design/pro-utils';
// @ts-ignore
import * as Components from '../components/index';

const BaseForm: React.FC<any> = (props) => {
  const rowData = props['data-row'] || {};
  const editList = Array.isArray(props['data-list']) ? props['data-list'] : [];
  const values = useContext(ProProvider);

  const valueTypeMap: Record<string, ProRenderFieldPropsType> = {};
  Object.keys(Components).forEach((warpCom: string) => {
    if (warpCom.startsWith('Vd')) {
      const cmpkey = warpCom.charAt(0).toUpperCase() + warpCom.substring(1);
      const WarpCommponent = Components[cmpkey];
      // console.log('WarpCommponent', WarpCommponent);
      valueTypeMap[warpCom] = {
        renderFormItem: (_: any, rprops: { fieldProps: any }) => {
          return (
            <WarpCommponent
              {...rprops}
              {...rprops?.fieldProps}
              rowData={rowData}
              editList={editList}
              id={props.id}
            />
          );
        },
      };
    }
  });

  return (
    <ProProvider.Provider
      value={{
        ...values,
        valueTypeMap: valueTypeMap,
      }}
    >
      <BetaSchemaForm {...props} layoutType="Form"></BetaSchemaForm>
    </ProProvider.Provider>
  );
};

export default BaseForm;
