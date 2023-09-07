import { Space } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import React from 'react';
import './Item.less';

type ItemProps = {
  record: FormListFieldData & {
    image_url?: string;
  };
};

const Item: React.FC<ItemProps> = (props) => {
  const { record } = props;
  return (
    <div className="crowd-image-item" key={record.key}>
      <img src={record['image_url']} className="crowd-image-item-img"></img>
      <Space direction="vertical" className="crowd-image-item-content">
        <div>链接</div>
        <div>选择定向人群</div>
      </Space>
    </div>
  );
};

export default Item;
