import type { DefaultOptionType } from 'antd/es/select';
import { useEffect, useMemo } from 'react';
import { ComponentSchemaProps } from '../../interface';
import VdAddList from '../VdAddList';
import TagItem from './TagItem';

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

export type VdAddElevatorNavProps = {
  value: SubEntryItem[];
  onChange: (val: SubEntryItem[]) => void;
  rowData?: any;
  editList?: ComponentSchemaProps[];
  id?: string;
};

/** 添加跳转 */
const VdAddElevatorNav: React.FC<VdAddElevatorNavProps> = (props) => {
  console.log('VdAddElevatorNav', props);
  const { rowData, value, onChange, id, editList } = props;

  const options: DefaultOptionType[] = useMemo(() => {
    const index = editList?.findIndex((it) => it.id === id);
    if (Array.isArray(editList) && index != null && index > -1) {
      console.log('index', index);
      const list = editList
        ?.filter((it, idx) => {
          return idx > index;
        })
        .map((it) => {
          return {
            label: it.cmpName,
            value: it.id,
          };
        });

      console.log('VdAddElevatorNav options', list);
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
            it.title = void 0;
          } else {
            // 找到组件但是排序比单前组件小也移除
            const index = map[it.cmpId || ''] || 0;
            if (index < currentIndex) {
              it.cmpId = void 0;
              it.cmpName = void 0;
              it.title = void 0;
            }
          }

          return it;
        });
        console.log('innerValue', innerValue);
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
    return rowData && rowData['show_method'] ? rowData['show_method'] : 'text';
  }, [rowData?.['show_method']]);

  const renderItem = (props: any) => {
    console.log('options', options);
    return <TagItem {...props} type={showMethod} options={options}></TagItem>;
  };

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

export default VdAddElevatorNav;
