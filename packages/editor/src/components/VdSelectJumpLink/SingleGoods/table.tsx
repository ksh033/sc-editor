import React, { FunctionComponent } from 'react';
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
// 默认数据
import data from './data';

const pageConfig: PageConfig = {
  service: {},
  ...list,
};

const defaultReq = getServiceApi('goods', 'goodsPage');

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

const Table = WithTable<GoodsTableProps>(
  GoodsTable,
  pageConfig,
  (props, searchInfo) => {
    // eslint-disable-next-line prefer-const
    const {
      rowKey: defaultRowKey = 'goodsId',
      request: defaultRequest = defaultReq,
      goodsType,
      setSearchInfo,
      ...restProps
    } = props;
    let rowKey = defaultRowKey;
    let request = defaultRequest;

    // if (setSearchInfo) {
    //   setSearchInfo();
    // }

    return { ...restProps, dataSource: data, pageSize: 10 };
  }
) as FunctionComponent<GoodsTableProps>;

export default Table;
