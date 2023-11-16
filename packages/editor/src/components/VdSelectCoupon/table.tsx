import React, { FunctionComponent } from 'react';
import { WithTable } from '@micro-frame/sc-runtime/es/components/WithComponent';
import type { WithTableProps } from '@micro-frame/sc-runtime/es/components/WithComponent';
import { getServiceApi } from '@micro-frame/sc-runtime';
import list from './list';
import type { PageConfig } from '@scboson/sc-schema';
// 默认数据
import data from './data';
const pageConfig: PageConfig = {
  service: {},
  ...list,
};

const defaultReq = getServiceApi('coupons', 'queryPage');

const CouponTable: React.FC<WithTableProps> = (props: any) => {
  const { children } = props;
  return <> {children}</>;
};
CouponTable.displayName = 'CouponTable';

export default WithTable<WithTableProps>(CouponTable, pageConfig, (props) => {
  return {
    ...props,
    // request: defaultReq,
    dataSource: data,
    rowKey: 'couponId',
    lightFilter: false,
    showIndex: true,
    // params: {
    //   ...(props.params || {}),
    //   validTimeFlag: true,
    //   issueFlag: true,
    // },
  };
}) as FunctionComponent<WithTableProps>;
