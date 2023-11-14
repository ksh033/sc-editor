import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { CModal } from '@scboson/sc-element';
import { useSetState } from 'ahooks';
import type SearchInfo from '@scboson/sc-schema/es/page/SearchInfo';
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
  let selecteds: any = null;

  useEffect(() => {
    if (value) {
      setState({
        useScope: value,
      });
    }
  }, [value]);

  const goodsTable = (
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
          selecteds = selectRows.map(
            ({ mallGoodsId, goodsName }, index: number) => ({
              mallGoodsId,
              goodsName,
              sortOrder: useScopeLength + index + 1,
            })
          );
          selecteds = _.unionBy(state.useScope, selecteds, 'mallGoodsId');
        }
      }}
    />
  );

  const onOpen = () => {
    CModal.show({
      title: '选择商品',
      content: goodsTable,
      onOk: () => {
        if (selecteds) {
          setState({ useScope: selecteds });

          onChange?.(selecteds);
        }
      },

      width: '900px',
    });
  };

  useImperativeHandle(ref, () => {
    return {
      open: onOpen,
    };
  });

  return <div>12</div>;
});
export default SingleGoods;
