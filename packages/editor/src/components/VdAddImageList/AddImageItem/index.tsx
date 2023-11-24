import { Fragment } from 'react';
import { Button, Input, Radio, RadioChangeEvent, Space, message } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import VdSelectImage from '../../VdSelectImage';
import VdSelectJumpLink from '../../VdSelectJumpLink';
import { onOpenHeatZone } from '../AddHeatZone';
import type { JumpLink } from '../../../interface/common.d';
import type { AddImageItemProps } from '../type';
import type { SelectJumpLinkValue } from '../../VdSelectJumpLink/type';
import './index.less';

const classPrefix = 'add-image-item';

const AddImageItem: React.FC<AddImageItemProps> = (props) => {
  const { value, onChange } = props;

  console.log('AddImageItem', props);

  const onUploadChange = (val: any) => {
    const newVal = value || {};
    onChange?.({
      ...newVal,
      ...val,
    });
  };

  const onRadioChange = (e: RadioChangeEvent) => {
    const newVal = value || {};
    onChange({
      ...newVal,
      jumpType: e.target.value,
      link: e.target.value === 'ALL' ? void 0 : [],
    });
  };

  /** 打开添加热区 */
  const onOpenHeatZoneModal = () => {
    if (value.imageUrl) {
      onOpenHeatZone({
        data: value,
        value: Array.isArray(value.link) ? value.link : [],
        onChange: (val: JumpLink[]) => {
          const newVal = Object.assign({}, value || {});
          onChange({
            ...newVal,
            link: val,
          });
        },
      });
    } else {
      message.error('请先选择图片');
    }
  };
  /** 选择链接 */
  const onSelectLink = (val?: SelectJumpLinkValue) => {
    const newVal = value || {};
    if (val != null) {
      const { innerContent, ...restVal } = val;
      onChange({
        ...newVal,
        link: restVal,
      });
    } else {
      onChange({
        ...newVal,
        link: void 0,
      });
    }
  };

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-choosed`}>
        <VdSelectImage value={value} onChange={onUploadChange}></VdSelectImage>
      </div>
      <div className={`${classPrefix}-content`}>
        <Space direction="vertical" className={`${classPrefix}-space`}>
          <span className={`${classPrefix}-content-label`}>链接设置</span>
          <Input placeholder="图片提示信息(非必填)"></Input>
          <Radio.Group onChange={onRadioChange} value={value.jumpType}>
            <Radio value="ALL">整体跳转</Radio>
            <Radio value="PART">分热区跳转</Radio>
          </Radio.Group>
          {/* 链接跳转 */}
          {value.jumpType === 'ALL' && !Array.isArray(value.link) && (
            <VdSelectJumpLink
              value={value.link}
              onChange={onSelectLink}
            ></VdSelectJumpLink>
          )}

          {/* 添加热区 */}
          {value.jumpType === 'PART' &&
            (!Array.isArray(value.link) || value.link.length === 0) && (
              <Button type="primary" size="small" onClick={onOpenHeatZoneModal}>
                添加热区
              </Button>
            )}
          {Array.isArray(value.link) && value.link.length > 0 && (
            <div className="has-hot-link" onClick={onOpenHeatZoneModal}>
              <Fragment>已选{value.link.length}个热区</Fragment>
              <EditOutlined className="has-hot-link-i" />
            </div>
          )}
        </Space>
      </div>
    </div>
  );
};

export default AddImageItem;
