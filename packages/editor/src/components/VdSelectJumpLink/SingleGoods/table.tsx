import React from 'react';
import type { PageConfig } from '@scboson/sc-schema';
import list from './list';
import type { ProColumn } from '@scboson/sc-schema/es/interface';
import type { RowSelectionType } from 'antd/es/table/interface';
import { getServiceApi } from '@micro-frame/sc-runtime';
import {
  WithTable,
  WithTableProps,
} from '@micro-frame/sc-runtime/es/components/WithComponent';
import type SearchInfo from '@scboson/sc-schema/lib/page/SearchInfo';
import type { CheckboxProps } from 'antd';
const pageConfig: PageConfig = {
  service: {},
  ...list,
};

const defaultReq = getServiceApi('goods', 'goodsPage');

export type SelectCargoTableProps = {
  extraColumns?: ProColumn[];
  request?: (params: any) => Promise<any>; // 请求数据的远程方法
  params?: any;
  goodsType?:
    | 'standard'
    | 'mall'
    | 'reserved'
    | 'noshowcatalog-goods'
    | 'discount-goods';
  rowKey?: string;
  selectionType: RowSelectionType;
  onTabelRow?: (selectedRowKeys: string[], selectedRows: any[]) => void;
  selectedRowKeys?: string[];
  selectedRows?: any[];
  isNeedLeft?: boolean;
  getCheckboxProps?: (
    record: any
  ) => Partial<Omit<CheckboxProps, 'defaultChecked' | 'checked'>>;
};

type GoodsTableProps = {
  goodsType?:
    | 'standard'
    | 'mall'
    | 'reserved'
    | 'noshowcatalog-goods'
    | 'discount-goods';
  addonBefore?: React.ReactNode;
  setSearchInfo?: (searchInfo: SearchInfo) => void;
} & WithTableProps;

const GoodsTable: React.FC<GoodsTableProps> = (props: GoodsTableProps) => {
  const { children, addonBefore } = props;
  return (
    <>
      {addonBefore}
      {children}
    </>
  );
};
GoodsTable.displayName = 'GoodsTable';

export default WithTable<GoodsTableProps>(
  GoodsTable,
  pageConfig,
  (props, searchInfo) => {
    // eslint-disable-next-line prefer-const
    const {
      rowKey: defaultRowKey = 'mallGoodsId',
      request: defaultRequest = defaultReq,
      goodsType,
      setSearchInfo,
      ...restProps
    } = props;
    let rowKey = defaultRowKey;
    let request = defaultRequest;
    if (goodsType === 'standard') {
      searchInfo.searchInfo.queryList[1].name = 'goodsName';
    }
    if (goodsType === 'discount-goods') {
      searchInfo.changeSearchItem('catalogScene', {
        hidden: true,
      });
    }
    if (setSearchInfo) {
      setSearchInfo(searchInfo);
    }

    return { ...restProps, rowKey, request };
  }
);
