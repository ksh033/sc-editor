import { CheckOutlined, PlusOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React, {
  PropsWithChildren,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react';
import './index.less';
import { imageList } from './list';

export type VdSelectImageItem = {
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
};

export type VdSelectImageProps = PropsWithChildren<{
  value?: VdSelectImageItem;
  onChange?: (val: VdSelectImageItem) => void;
}>;

export type VdSelectImageRef = {
  /** 打开弹窗 */
  openModal: () => void;
};
/** 选择图片 */
const VdSelectImage = React.forwardRef<VdSelectImageRef, VdSelectImageProps>(
  (props, ref) => {
    const { value, onChange, children } = props;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [list, setList] = useState<any[]>(imageList);
    const [innerValue, setInnerValue] = useState<VdSelectImageItem>(
      value != null ? value : {}
    );

    /**监听并更新数据 */
    useEffect(() => {
      if (value && value?.imageId !== innerValue.imageId) {
        setInnerValue(value);
      }
    }, [JSON.stringify(value)]);

    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
      onChange?.(innerValue);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };

    const splitStrBefore = (str: string) => {
      if (typeof str === 'string' && str.length > 0) {
        return str.substring(0, str.length - 5);
      }
      return '';
    };

    const splitStrEnd = (str: string) => {
      if (typeof str === 'string' && str.length > 0) {
        return str.substring(str.length - 5, str.length);
      }
      return '';
    };

    useImperativeHandle(ref, () => {
      return {
        openModal: showModal,
      };
    });

    /** 选中 */
    const onSelect = (item: any) => {
      setInnerValue({
        imageId: item.attachmentId,
        imageUrl: item.attachmentUrl,
        imageWidth: item.width,
        imageHeight: item.height,
        imageThumbUrl: item.attachmentUrl,
      });
    };

    return (
      <>
        {children ? (
          children
        ) : (
          <>
            {value?.imageUrl ? (
              <div className="vd-select-image">
                <img src={value?.imageUrl} className="thumb-image"></img>
                <span className="modify-image" onClick={showModal}>
                  更换图片
                </span>
              </div>
            ) : (
              <div className="vd-select-image" onClick={showModal}>
                <PlusOutlined style={{ fontSize: 16 }} />
                <span style={{ marginTop: '4px' }}>添加图片</span>
              </div>
            )}
          </>
        )}
        <Modal
          title="选择图片"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okButtonProps={{
            disabled: innerValue == null || innerValue.imageId == null,
          }}
          width={828}
        >
          <div className="vd-select-image-modal">
            <div className="list-container">
              {list.map((item, idx) => {
                return (
                  <div
                    className="list-item"
                    onClick={() => {
                      onSelect(item);
                    }}
                    key={`select-image-item-${item.attachmentId}-${idx}`}
                  >
                    <div
                      className="image-box"
                      style={{ backgroundImage: `url(${item.attachmentUrl})` }}
                    >
                      <span className="image-meta">
                        {item.width}*{item.height}
                      </span>
                    </div>
                    <div className="image-title-wrap">
                      <p className="image-title-wrap__title">
                        {splitStrBefore(item.attachmentTitle)}
                      </p>
                      <p className="image-title-wrap__ext">
                        {splitStrEnd(item.attachmentTitle)}
                      </p>
                    </div>
                    {item.attachmentId === innerValue.imageId && (
                      <div className="image-box-selected">
                        <div className="image-box-selected__right-angle"></div>
                        <div className="image-box-selected__text">
                          <CheckOutlined style={{ fontSize: '14px' }} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

export default VdSelectImage;
