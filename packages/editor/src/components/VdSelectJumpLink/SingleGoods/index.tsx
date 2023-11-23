import { forwardRef, useEffect, useMemo } from 'react';
import { useMap, useSetState } from 'ahooks';
import _, { values } from 'lodash';
import { JumpModalRef } from '../type';
import SelectGoodsTable from './table';

export type SingleGoodsProps = {
  value?: any;
  onChange?: (value: any) => any;
  selectionType?: 'checkbox' | 'radio' | undefined;
  rowId?: string;
};

/** 单个商品页面地址选择 */
const SingleGoods = forwardRef<JumpModalRef, SingleGoodsProps>((props, ref) => {
  const {
    value = [],
    onChange,
    selectionType = 'checkbox',
    rowId = 'goodsId',
  } = props;

  const selectedRowKeys = useMemo(() => {
    return Array.isArray(value) ? value.map((item) => item[rowId]) : [];
  }, [JSON.stringify(value)]);

  return (
    <SelectGoodsTable
      selectionType={selectionType}
      rowKey={rowId}
      params={{
        filterCommitionFlag: false,
      }}
      selectedRowKeys={selectedRowKeys}
      selectedRows={value || []}
      getCheckboxProps={(record: any) => {
        if (selectedRowKeys.indexOf(record[rowId]) > -1) {
          return { disabled: true };
        }
        return { disabled: false };
      }}
      onTabelRow={(keys, selectRows: any[]) => {
        if (Array.isArray(selectRows)) {
          let selecteds = selectRows;
          selecteds = _.unionBy(value, selecteds, rowId);
          onChange?.(selecteds);
        }
      }}
    />
  );
});
export default SingleGoods;
