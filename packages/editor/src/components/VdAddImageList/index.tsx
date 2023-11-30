import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import VdAddList, { VdAddListProps } from '../VdAddList';
import VdSelectImage, {
  VdSelectImageItem,
  VdSelectImageRef,
} from '../VdSelectImage';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';
import AddImageItem from './AddImageItem';

type VdAddImageListProps = VdAddListProps<any>;

/** 添加图片 */
const VdAddImageList: SysEditorPropertyComponent<VdAddImageListProps> = (
  props
) => {
  const renderItem = (rprops: any) => {
    return <AddImageItem {...rprops}></AddImageItem>;
  };

  const modalRef = useRef<VdSelectImageRef>(null);

  const contentCmp = (
    <div>
      <div key="title">最多添加 5 个广告。</div>
      <div key="content">
        最多添加 10 个广告，鼠标拖拽调整广告顺序，建议宽度750像素
      </div>
    </div>
  );
  /** 添加数据 */
  const handleAddClick = (record: VdSelectImageItem) => {
    if (Array.isArray(props.value)) {
      const newRecord = Object.assign(record, {
        jumpType: 'ALL',
      });
      const newValue = [...props.value, newRecord];
      props.onChange?.(newValue);
    }
  };

  const addBtnRender = (list: any[]) => {
    return (
      <VdSelectImage ref={modalRef} onChange={handleAddClick}>
        <Button
          ghost
          key="addbtn"
          type="primary"
          onClick={() => {
            modalRef.current?.openModal();
          }}
          block
          icon={<PlusOutlined />}
        >
          <span>{`添加图片（${list.length} / 10）`}</span>
        </Button>
      </VdSelectImage>
    );
  };

  return (
    <VdAddList
      {...props}
      max={10}
      renderItem={renderItem}
      content={contentCmp}
      addBtnRender={addBtnRender}
    ></VdAddList>
  );
};
VdAddImageList.valueType = 'VdAddImageList';
registerEditorAttrCmp(VdAddImageList);
export default VdAddImageList;
