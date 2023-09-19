import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import { useRef } from 'react';
import VdAddList, { VdAddListProps } from '../VdAddList';
import VdImgLink from '../VdImgLink';
import VdSelectImage, {
  VdSelectImageItem,
  VdSelectImageRef,
} from '../VdSelectImage';

type VdAddImageListProps = VdAddListProps<any>;

/** 添加图片 */
const VdAddImageList: React.FC<VdAddImageListProps> = (props) => {
  const renderItem = (rprops: any) => {
    return <VdImgLink {...rprops}></VdImgLink>;
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
      const newValue = [...props.value, record];
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
          {typeof props.addBtnText === 'string'
            ? props.addBtnText
            : props.addBtnText?.(list)}
        </Button>
      </VdSelectImage>
    );
  };

  return (
    <VdAddList
      {...props}
      max={10}
      title="添加图片"
      renderItem={renderItem}
      content={contentCmp}
      addBtnRender={addBtnRender}
    ></VdAddList>
  );
};

export default VdAddImageList;
