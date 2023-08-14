import { BetaSchemaForm } from '@ant-design/pro-form';
import ProProvider from '@ant-design/pro-provider';
import React, { useContext } from 'react';
// @ts-ignore
import { ProRenderFieldPropsType } from '@ant-design/pro-utils';
import * as Components from '@sceditor/element';
import { valueTypelist } from '../../index';

const BaseForm: React.FC<any> = (props) => {
  const rowData = props['data-row'] || {};
  const values = useContext(ProProvider);

  const valueTypeMap: Record<string, ProRenderFieldPropsType> = {};
  valueTypelist.forEach((warpCom) => {
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
          />
        );
      },
    };
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
