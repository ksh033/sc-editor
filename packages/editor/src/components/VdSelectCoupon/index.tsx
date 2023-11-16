import React, { useMemo, useRef } from 'react';
import { Button, type InputProps } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { CModal } from '@scboson/sc-element';
import Table from './table';
import VdAddList from '../VdAddList';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';
import { CouponItemProps, VdSelectCouponProps } from './type';

/** 选择优惠券 */
const VdSelectCoupon: SysEditorPropertyComponent<VdSelectCouponProps> = (
  props
) => {
  const { value = [], onChange, renderItem } = props;

  let temselectList = useRef<CouponItemProps[]>([]);

  const couponList = useMemo(() => {
    if (Array.isArray(value)) {
      return value.map((it) => it.couponId).filter(Boolean);
    }
    return [];
  }, [JSON.stringify(value)]);

  const cmp = (
    <Table
      selectionType="checkbox"
      getCheckboxProps={(record: any) => {
        if (couponList.indexOf(record.couponId) > -1) {
          return { disabled: true };
        }
        return { disabled: false };
      }}
      onTabelRow={(keys, selectRows: any[]) => {
        if (selectRows.length > 0) {
          temselectList.current = selectRows;
        }
      }}
    />
  );

  const onClickSelect = () => {
    CModal.show({
      title: '选择优惠券',
      content: cmp,
      width: '1000px',
      onOk: () => {
        if (
          Array.isArray(temselectList.current) &&
          temselectList.current.length > 0
        ) {
          const map = new Set(couponList);
          const addValue = temselectList.current.filter(
            (it) => !map.has(it.couponId)
          );
          onChange && onChange([...addValue, ...value]);
          temselectList.current = [];
        }
      },
    });
  };
  return (
    <VdAddList
      value={value}
      onChange={onChange}
      max={10}
      renderItem={renderItem}
      rowKey="couponId"
      addBtnRender={() => {
        return (
          <Button
            key="addbtn"
            type="primary"
            ghost
            onClick={onClickSelect}
            block
            icon={<PlusOutlined />}
          >
            添加优惠券
          </Button>
        );
      }}
    ></VdAddList>
  );
};

VdSelectCoupon.valueType = 'VdSelectCoupon';

registerEditorAttrCmp(VdSelectCoupon);

export default VdSelectCoupon;
