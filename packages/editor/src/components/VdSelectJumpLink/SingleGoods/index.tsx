import { forwardRef, useEffect } from 'react';
import { useSetState } from 'ahooks';
import _ from 'lodash';
import { JumpModalRef } from '../type';
import SelectGoodsTable from './table';

export type SingleGoodsProps = {
  value?: any;
  onChange?: (value: any) => any;
};

/** 单个商品页面地址选择 */
const SingleGoods = forwardRef<JumpModalRef, SingleGoodsProps>((props, ref) => {
  const { value, onChange } = props;
  const [state, setState] = useSetState<{ useScope: any[]; checked: any }>({
    useScope: [],
    checked: false,
  });
  const selectedRowKeys = state.useScope.map(({ mallGoodsId }) => mallGoodsId);

  useEffect(() => {
    if (value) {
      setState({
        useScope: value,
      });
    }
  }, [value]);

  return (
    <SelectGoodsTable
      selectionType="checkbox"
      params={{
        filterCommitionFlag: false,
      }}
      selectedRowKeys={selectedRowKeys}
      getCheckboxProps={(record: any) => {
        if (
          selectedRowKeys.indexOf(record.mallGoodsId) > -1 ||
          !record.selectAble
        ) {
          return { disabled: true };
        }
        return { disabled: false };
      }}
      onTabelRow={(keys, selectRows: any[]) => {
        if (Array.isArray(selectRows)) {
          const useScopeLength = state.useScope.length;
          let selecteds = selectRows.map(
            ({ mallGoodsId, goodsName }, index: number) => ({
              mallGoodsId,
              goodsName,
              sortOrder: useScopeLength + index + 1,
            })
          );
          selecteds = _.unionBy(state.useScope, selecteds, 'mallGoodsId');

          onChange?.(selecteds);
        }
      }}
    />
  );
});
export default SingleGoods;
