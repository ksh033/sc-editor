import { forwardRef, useEffect, useMemo, useState } from 'react';
import _, { values } from 'lodash';
import { JumpModalRef } from '../type';
import SelectGoodsTable from './table';
import { CModal } from '@scboson/sc-element';
import { ModalPageContainer } from '@micro-frame/sc-runtime';
import type { CustomModal } from '../../../interface/common';
import { message } from 'antd';

export type SingleGoodsProps = {
  value?: any[];
  onChange?: (value: any[]) => any;
  selectionType?: 'checkbox' | 'radio' | undefined;
  rowId?: string;
};

/** 单个商品页面地址选择 */
const SingleGoods: React.FC<CustomModal<SingleGoodsProps>> = (props) => {
  const { close, pageProps } = props;

  const { value = [], onChange } = pageProps;

  const rowId = pageProps.rowId || 'goodsId';
  const selectionType = pageProps.selectionType || 'checkbox';

  const [innerValue, setValue] = useState<any[]>([]);

  const selectedRowKeys = useMemo(() => {
    return Array.isArray(value) ? value.map((item) => item[rowId]) : [];
  }, [JSON.stringify(value)]);

  useEffect(() => {
    if (Array.isArray(value)) {
      setValue(value);
    }
  }, [JSON.stringify(value)]);

  const modalButtons = [
    {
      text: '取消',
      onClick() {
        close();
      },
    },
    {
      text: '确定',
      type: 'primary',
      onClick() {
        if (innerValue.length > 0) {
          onChange?.(innerValue);
          close();
        } else {
          message.warning('请选择商品');
        }
      },
    },
  ];

  return (
    <ModalPageContainer toolbar={modalButtons}>
      <SelectGoodsTable
        selectionType={selectionType}
        rowKey={rowId}
        params={{
          filterCommitionFlag: false,
        }}
        selectedRowKeys={selectedRowKeys}
        selectedRows={innerValue || []}
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
            setValue(selecteds);
          }
        }}
      />
    </ModalPageContainer>
  );
};

export const onOpenSingleGoods = (pageProps: SingleGoodsProps) => {
  CModal.show({
    title: '选择商品',
    width: '1000px',
    content: SingleGoods,
    okCancel: false,
    footer: null,
    pageProps: pageProps,
  });
};

export default SingleGoods;
