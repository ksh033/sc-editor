import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { useDebounceFn } from 'ahooks';
import { Button } from 'antd';
import React, { useContext, useMemo, useRef } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { VdFormItemProps } from '../VdFormItem';
import './index.less';
import {
  EditorPropertyContext,
  registerEditorAttrCmp,
} from '@sceditor/editor-core';
import type { BaseFromItemProps } from '@sceditor/core';
import { arrayMove } from 'react-sortable-hoc';

type typeNode = 'tag' | 'card';

export type VdAddListProps<T> = VdFormItemProps &
  BaseFromItemProps<T[]> & {
    /** 添加按钮文案 */
    addBtnText?: string | ((fields: any[]) => React.ReactNode);
    /** 添加展示类型 */
    type?: typeNode;
    /** 最大添加数据 */
    max?: number;
    /** 分组标题 */
    groupTitle?: () => React.ReactNode;
    addRecord?: any;
    /** 子项目格式化 */
    renderItem?: (pros: any) => React.ReactNode;
    rowKey?: string;
    title?: string | React.ReactNode;
    /** 内容 */
    content?: string | React.ReactNode;
    /** 添加按钮自定义 */
    addBtnRender?: (val: T[], max: number) => React.ReactNode;
  };

const VdAddList = <T extends object>(props: VdAddListProps<T>) => {
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
    addBtnRender,
  } = props;

  const ref = useRef<HTMLDivElement>(null);

  const editorValue = useContext(EditorPropertyContext);

  const editList = useMemo(() => {
    return editorValue.editList;
  }, [JSON.stringify(editorValue.editList)]);

  const getRowKey = React.useMemo<any>(() => {
    if (typeof rowKey === 'function') {
      return rowKey;
    }
    return (record: any, index: number) =>
      (record as any)?.[rowKey as string] ?? index + '';
  }, [rowKey]);

  const list = value;

  const setList = (li: any[]) => {
    onChange?.(li);
  };

  const handleAddClick = (record: any) => {
    if (Array.isArray(list) && list.length < max) {
      const newValue = [...value, record];
      onChange?.(newValue);
    }
  };

  const onItemChange = (record: any, idx: number) => {
    if (Array.isArray(list)) {
      const newList = JSON.parse(JSON.stringify(list));
      const index = newList.findIndex(
        (it: any, index: number) =>
          getRowKey(it, index) === getRowKey(record, idx)
      );
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

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    // change background colour if dragging
    background: isDragging ? 'lightgreen' : 'transparent',
    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    let newList = JSON.parse(JSON.stringify(list));
    newList = arrayMove(newList, result.source.index, result.destination.index);
    console.log('onSortEnd', newList);
    setList(newList);
  };

  let customTitle = groupTitle ? groupTitle() : null;

  if (title != null) {
    customTitle = defaultGroupTitle();
  }

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
          {/* <SLortableContainer
            onSortEnd={onSortEnd}
            helperClass="sortable-list-tab"
            distance={1}
          >
            {list.map((items, index) => (
              <SortableItem
                key={`item-${index}`}
                index={index}
                sortIndex={index}
                it={items}
                getRowKey={getRowKey}
                editList={editList}
                onHandleDetele={onHandleDetele}
                renderItem={renderItem}
                onItemChange={run}
              />
            ))}
          </SLortableContainer> */}

          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided, snapshot) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {list.map((item, index) => (
                    <Draggable
                      key={getRowKey(item, index)}
                      draggableId={getRowKey(item, index)}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          className="vd-add-list-item"
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          onClick={() => {}}
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <CloseCircleFilled
                            className="vd-add-list-item__delete"
                            onClick={() => {
                              const key = getRowKey(item, index);
                              console.log(key);
                              onHandleDetele(getRowKey(item, index));
                            }}
                          />
                          {renderItem
                            ? renderItem({
                                value: item,
                                onChange: (record) => {
                                  run(record, index);
                                },
                                editList,
                              })
                            : null}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          {/* 添加按钮 */}
          {list.length < max ? (
            addBtnRender ? (
              addBtnRender(list, max)
            ) : (
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
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

VdAddList.valueType = 'VdAddList';
registerEditorAttrCmp(VdAddList);
export default VdAddList;
