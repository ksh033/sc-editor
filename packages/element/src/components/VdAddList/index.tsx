import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Button } from 'antd';
import React, { useMemo, useRef } from 'react';
import type { SortEnd } from 'react-sortable-hoc';
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc';
import { VdFormItemProps } from '../VdFormItem';
import './index.less';

type typeNode = 'tag' | 'card';

type VdAddListProps<T> = VdFormItemProps & {
  addBtnText?: string | ((fields: any[]) => React.ReactNode);
  type?: typeNode;
  max?: number;
  groupTitle?: () => React.ReactNode;
  addRecord?: any;
  /** 子项目格式化 */
  renderItem?: (it: any, index: number) => React.ReactNode;
  value?: T[];
  onChange?: (list: T[]) => void;
  rowKey?: string;
  title?: string | React.ReactNode;
  content?: string | React.ReactNode;
};

const SortableItem: any = SortableElement((props: any) => {
  console.log('SortableItem', props);
  const {
    it,
    idx,
    getRowKey,
    onHandleDetele,
    renderItem,
    onItemChange,
    editList = [],
  } = props;

  return (
    <div className="vd-add-list-item">
      <CloseCircleFilled
        className="vd-add-list-item__delete"
        onClick={() => {
          onHandleDetele(getRowKey(it, idx));
        }}
      />
      {renderItem
        ? renderItem({
            value: it,
            onChange: onItemChange,
            editList,
          })
        : null}
    </div>
  );
});

const SLortableContainer = SortableContainer<any>(({ children }: any) => {
  return <div>{children}</div>;
});

function VdAddList<T>(props: VdAddListProps<T>) {
  const {
    addBtnText = '新增',
    max = 999,
    groupTitle,
    addRecord = {},
    renderItem,
    value = [],
    onChange,
    rowKey = 'key',
    content,
    title,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const editList = useMemo(() => {
    return props.editList;
  }, [props.editList]);

  const getRowKey = React.useMemo<any>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: any, index: number) =>
      (record as any)?.[rowKey as string] ?? index;
  }, [rowKey]);

  const list = value;

  const setList = (li: any[]) => {
    onChange?.(li);
  };

  const handleAddClick = (record: any) => {
    if (Array.isArray(list) && list.length < max) {
      const newValue = [...value, record].map((it, index) => {
        return {
          key: index + '',
          ...it,
        };
      });
      onChange?.(newValue);
    }
  };

  const onItemChange = (record: any) => {
    if (Array.isArray(list)) {
      const newList = JSON.parse(JSON.stringify(list));
      const index = newList.findIndex(
        (it: any, index: number) => getRowKey(it, index) === getRowKey(record)
      );
      console.log('onItemChange', record);
      newList.splice(index, 1, record);
      setList(newList);
    }
  };

  const { run } = useDebounceFn(onItemChange, {
    wait: 200,
  });

  const onHandleDetele = (key: string) => {
    if (Array.isArray(list)) {
      const newList = list.filter((it, index) => getRowKey(it, index) !== key);
      setList(newList);
    }
  };

  const defaultGroupTitle = () => {
    return (
      <div className="vd-add-list-heard">
        <div className="vd-add-list-heard-content">
          <div className="vd-add-list-heard-label">{title}</div>
          {content ? (
            <div
              className="vd-add-list-heard-label"
              style={{ marginTop: '10px', color: ' #969799' }}
            >
              {content}
            </div>
          ) : null}
        </div>
      </div>
    );
  };

  const onSortEnd = ({ oldIndex, newIndex }: SortEnd) => {
    let newList = JSON.parse(JSON.stringify(list));
    newList = arrayMove(newList, oldIndex, newIndex);
    console.log('onSortEnd', newList);
    setList(newList);
  };

  let customTitle = groupTitle ? groupTitle() : null;

  if (title != null) {
    customTitle = defaultGroupTitle();
  }

  const container = document.getElementById('edit-property');

  return (
    <>
      <div className="vd-add-list" ref={ref}>
        {customTitle !== null ? (
          <div className="vd-add-list-title" key="title">
            {customTitle}
          </div>
        ) : null}
        <div
          className="vd-add-list-content"
          style={{ marginTop: customTitle == null ? '0' : '12px' }}
        >
          <SLortableContainer
            onSortEnd={onSortEnd}
            helperClass="sortable-list-tab"
          >
            {list.map((items, index) => (
              <React.Fragment key={index}>
                <SortableItem
                  key={`item-${index}`}
                  index={index}
                  it={items}
                  getRowKey={getRowKey}
                  editList={editList}
                  onHandleDetele={onHandleDetele}
                  renderItem={renderItem}
                  onItemChange={run}
                />
              </React.Fragment>
            ))}
          </SLortableContainer>
          {list.length < max ? (
            <Button
              ghost
              key="addbtn"
              type="primary"
              onClick={() => handleAddClick(addRecord)}
              block
              icon={<PlusOutlined />}
            >
              {typeof addBtnText === 'string' ? addBtnText : addBtnText(list)}
            </Button>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default VdAddList;
