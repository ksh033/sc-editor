import React, { FunctionComponent } from 'react';
import type { PageConfig } from '@scboson/sc-schema';
import list from './list';
import { getServiceApi } from '@micro-frame/sc-runtime';
import {
  WithTable,
  WithTableProps,
} from '@micro-frame/sc-runtime/es/components/WithComponent';
import type SearchInfo from '@scboson/sc-schema/lib/page/SearchInfo';
const pageConfig: PageConfig = {
  service: {},
  ...list,
};

const defaultReq = getServiceApi('goods', 'goodsPage');

type GoodsGroupTableProps = {
  addonBefore?: React.ReactNode;
  setSearchInfo?: (searchInfo: SearchInfo) => void;
} & WithTableProps;

const GoodsTable: React.FC<GoodsGroupTableProps> = (
  props: GoodsGroupTableProps
) => {
  const { children, addonBefore } = props;
  return (
    <>
      {addonBefore}
      {children}
    </>
  );
};
GoodsTable.displayName = 'GoodsTable';

const Table = WithTable<GoodsGroupTableProps>(
  GoodsTable,
  pageConfig,
  (props, searchInfo) => {
    const {
      rowKey: defaultRowKey = 'goodsGroupId',
      request: defaultRequest = defaultReq,
      setSearchInfo,
      ...restProps
    } = props;
    let rowKey = defaultRowKey;
    let request = defaultRequest;

    return { ...restProps, rowKey, request };
  }
) as FunctionComponent<GoodsGroupTableProps>;

export default Table;
