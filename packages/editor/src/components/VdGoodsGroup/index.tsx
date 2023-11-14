import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input } from 'antd';
import { FormListFieldData } from 'antd/es/form/FormList';
import React from 'react';
import { VdFormItemProps } from '../VdFormItem';
import SetGoodsCount from './SetGoodsCount';
import './index.less';
import GoodsTagItem from './GoodsTagItem';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { SysEditorPropertyComponent } from '../interface';
import VdIcon from '../VdIcon';

type typeNode = 'tag' | 'card';

type VdGoodsGroupProps = VdFormItemProps & {
  addBtnText?: string;
  type?: typeNode;
  max?: number;
  groupTitle?: React.ReactNode;
};

type VdGoodsGroupDataNode = {
  alias: 'q2phvc06';
  goods_count: number;
  title: string;
  tag_name?: string;
  id: number | string;
  subtitle: string;
  children: any[];
  isShowAll?: boolean;
};

const VdGoodsGroup: SysEditorPropertyComponent<VdGoodsGroupProps> = (props) => {
  const {
    addBtnText = '选择商品分组',
    formItem,
    type = 'card',
    max = 999,
    groupTitle = '商品分组管理',
  } = props;
  const form = Form.useFormInstance();

  console.log('props', form);

  const fieldsFormat = (
    it: FormListFieldData,
    remove: (index: number | number[]) => void,
    itType: typeNode
  ) => {
    const { name, ...restField } = it;

    const title: string =
      form.getFieldValue(['sub_entry', name, 'groupName']) || '';

    if (itType === 'card') {
      return (
        <div className="vd-goods-group-card-item" key={it.key}>
          <CloseCircleFilled
            className="card-item__delete"
            onClick={() => {
              remove(it.name);
            }}
          />
          <div className="vd-goods-group-card-item-header">
            <div className="tag-detail">
              <i className="drag-icon"></i>
              <a className="goods-group-name" target="_blank">
                <VdIcon type="deco-icon-tag-icon "></VdIcon>
                {title}
              </a>
            </div>
            <div className="modify-btn">修改</div>
          </div>
          <div
            className="decorate-divider"
            style={{
              backgroundColor: 'rgb(235, 237, 240)',
              margin: '12px 16px',
            }}
          ></div>
          <Form.Item
            {...restField}
            className="vd-goods-group-card-item-padding"
            name={[name, 'goodsConfig']}
            label="显示商品"
            key={[name, 'goodsConfig'].join('-')}
            rules={[
              ({}) => ({
                validator(_, value) {
                  if (
                    value.isShowAll === false &&
                    Number(value.goods_number || 0) <= 0
                  ) {
                    return Promise.reject(new Error('请填写大于0的数字'));
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <SetGoodsCount />
          </Form.Item>
          <Form.Item
            {...restField}
            className="vd-goods-group-card-item-padding"
            name={[name, 'tagName']}
            label="菜单名称"
            key={[name, 'tag_name'].join('-')}
          >
            <Input placeholder="最多14个字" maxLength={14} />
          </Form.Item>
        </div>
      );
    } else {
      return (
        <Form.Item {...restField} name={name} key={it.key}>
          <GoodsTagItem
            key={it.key}
            name={it.name}
            remove={remove}
          ></GoodsTagItem>
        </Form.Item>
      );
    }
  };

  return (
    <>
      <div className="vd-goods-group">
        {groupTitle && <div className="vd-goods-group-title">{groupTitle}</div>}
        <Form.List name={formItem?.name || ''}>
          {(fields, { add, remove }) => (
            <>
              {fields.map((it) => {
                return fieldsFormat(it, remove, type);
              })}
              {fields.length < max ? (
                <Button
                  ghost
                  key="btn"
                  className="goods-group-add-btn"
                  type="primary"
                  onClick={() =>
                    add({
                      alias: 's5vbc7wa',
                      id: 121558147,
                      timestamp: 1655429502304,
                      groupName: '最热商品',
                      type: 'tag',
                      tagName: '最热商品',
                      url: 'https://h5.youzan.com/v2/showcase/tag?alias=s5vbc7wa',
                      goodsConfig: {
                        isShowAll: true,
                        goods_number: 0,
                      },
                    })
                  }
                  block
                  icon={<PlusOutlined />}
                >
                  {addBtnText}
                </Button>
              ) : null}
            </>
          )}
        </Form.List>
        <div className="vd-goods-group-tips">
          最多不超过15个分组，拖拽可调整分组顺序
        </div>
      </div>
    </>
  );
};
VdGoodsGroup.valueType = 'VdGoodsGroup';
registerEditorAttrCmp(VdGoodsGroup);
export default VdGoodsGroup;
