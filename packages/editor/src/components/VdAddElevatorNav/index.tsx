import type { DefaultOptionType } from 'antd/es/select';
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { ComponentSchemaProps } from '../../interface';
import VdAddList from '../VdAddList';
import TagItem from './TagItem';
import {
  registerEditorAttrCmp,
  EditorPropertyContext,
} from '@sceditor/editor-core';
import type { BaseFromItemProps } from '@sceditor/core';
import { SysEditorPropertyComponent } from '../interface';

export type SubEntryItem = {
  /** 图片id */
  imageId?: string;
  /** 图片地址 */
  imageUrl?: string;
  /** 缩略图 */
  imageThumbUrl?: string;
  /** 图片宽度 */
  imageWidth?: number;
  /**图片高度 */
  imageHeight?: number;
  /** 文本 */
  title?: string;
  /** 组件名称 */
  cmpName?: string;
  /** 组件id */
  cmpId?: string;
  /** key */
  key?: string;
  linkValue?: string;
  /** 是否使用链接 */
  useLink?: boolean;
};

export type VdAddElevatorNavProps = BaseFromItemProps<SubEntryItem[]>;

/** 添加跳转 */
const VdAddElevatorNav: SysEditorPropertyComponent<VdAddElevatorNavProps> = (
  props
) => {
  const { value, onChange } = props;
  const editorValue = useContext(EditorPropertyContext);

  const attrFromData = useMemo(() => {
    return editorValue.attrFromData;
  }, [JSON.stringify(editorValue.attrFromData)]);

  const editList = useMemo(() => {
    return editorValue.editList;
  }, [JSON.stringify(editorValue.editList)]);

  const id = useMemo(() => {
    return editorValue.id;
  }, [editorValue.id]);

  const options: DefaultOptionType[] = useMemo(() => {
    const index = editList?.findIndex((it) => it.id === id);
    if (Array.isArray(editList) && index != null && index > -1) {
      const list = editList
        ?.map((it, idx) => {
          return {
            label: `${idx + 1}.${it.cmpName}`,
            value: it.id,
          };
        })
        .filter((it, idx) => {
          return idx > index;
        });
      return list;
    }
    return [];
  }, [JSON.stringify(editList), id]);

  const formatValue = () => {
    if (Array.isArray(editList)) {
      const map: Record<string, number> = {};
      editList?.forEach((it, index) => {
        map[it.id] = index;
      });
      const currentIndex = map[id || ''];
      if (currentIndex) {
        let innerValue = Array.isArray(value) ? [...value] : [];
        innerValue = innerValue.map((it) => {
          // 找不到组件直接删除
          if (map[it.cmpId || ''] == null) {
            it.cmpId = void 0;
            it.cmpName = void 0;
          } else {
            // 找到组件但是排序比单前组件小也移除
            const index = map[it.cmpId || ''] || 0;
            if (index < currentIndex) {
              it.cmpId = void 0;
              it.cmpName = void 0;
            }
          }

          return it;
        });
        onChange?.(innerValue);
      }
    }
  };

  useEffect(() => {
    formatValue();
  }, [JSON.stringify(editList)]);

  const addBtnText = (list: any[]) => {
    return `添加标签（${list.length}/20）`;
  };
  /** 类型 */
  const showMethod = useMemo(() => {
    return attrFromData && attrFromData['show_method']
      ? attrFromData['show_method']
      : 'text';
  }, [attrFromData?.['show_method']]);

  const renderItem = useCallback(
    (props: any) => {
      return <TagItem {...props} type={showMethod} options={options}></TagItem>;
    },
    [JSON.stringify(options), showMethod]
  );

  return (
    <VdAddList<SubEntryItem>
      title="最多添加20个标签，鼠标拖拽调整标签顺序。图片建议尺寸100*100像素"
      addBtnText={addBtnText}
      max={20}
      addRecord={{}}
      renderItem={renderItem}
      value={value}
      onChange={onChange}
    ></VdAddList>
  );
};
VdAddElevatorNav.valueType = 'VdAddElevatorNav';
registerEditorAttrCmp(VdAddElevatorNav);
export default VdAddElevatorNav;
