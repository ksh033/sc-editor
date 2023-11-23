import { Button, Input, Radio, RadioChangeEvent, Space, message } from 'antd';
import { CModal } from '@scboson/sc-element';
import VdSelectImage from '../../VdSelectImage';
import VdSelectJumpLink from '../../VdSelectJumpLink';
import AddHeatZone from '../AddHeatZone';
import type { AddImageItemProps } from '../type';
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
    });
  };

  const cmp = (
    <AddHeatZone
      data={value}
      value={Array.isArray(value.link) ? value.link : []}
    ></AddHeatZone>
  );

  /** 打开添加热区 */
  const onOpenHeatZone = () => {
    if (value.imageUrl) {
      CModal.show({
        title: '编辑图片热区',
        content: cmp,
        width: '750px',
        onOk: () => {},
      });
    } else {
      message.error('请先选择图片');
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
          {value.jumpType === 'ALL' && <VdSelectJumpLink></VdSelectJumpLink>}

          {/* 添加热区 */}
          {value.jumpType === 'PART' && (
            <Button type="primary" size="small" onClick={onOpenHeatZone}>
              添加热区
            </Button>
          )}
        </Space>
      </div>
    </div>
  );
};

export default AddImageItem;
