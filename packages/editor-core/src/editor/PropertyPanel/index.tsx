import { Form } from 'antd';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useStore } from '../../stores';
import { ModalType } from '../../stores/editor';
import './index.less';
import PanelList from './PanelList';

const PropertyPanel: React.FC<any> = (props:any) => {
  const { editorStore, comsStore } = useStore();

  const modalType = editorStore.modalType;

  const editList = editorStore.editList;

  const editCmp =
    modalType === 'pageSet' ? editorStore.pageinfo : editorStore.currentEditCmp;

  const [form] = Form.useForm();

  const [values, setValues] = useState<any>(editCmp?.getFieldsValue() || {});
  const oldEditCmoId = useRef<string>(editCmp?.id || '');

  const editCmpInfo = comsStore.getCompInfoByKey(editCmp?.cmpType || '');

  useLayoutEffect(() => {
    if (editCmp?.id) {
      const newValues = editCmp?.getFieldsValue() || {};
      setValues(newValues);
      oldEditCmoId.current = editCmp?.id;
      form.setFieldsValue(newValues);
    }
  }, [editCmp?.id]);

  // 判读是否一进来就校验
  useEffect(() => {
    form.validateFields();
    editCmp?.setImmediatelyCheck(false);
  }, [Boolean(editCmp?.immediatelyCheck)]);

  const onPageValuesChange = (values: any, allValues: any) => {
    // 更新页面数据
    editorStore.updatePageInfoValues(allValues);
  };

  const onValuesChange = (values: any) => {
    const initialValues = editCmp?.getInitialValue
      ? editCmp?.getFieldsValue()
      : {};
    let newValues = { ...initialValues, ...values };
    const oldValues = { ...initialValues, ...values };
    // 修改表单
    if (editCmp?.onValuesChange) {
      newValues = editCmp?.onValuesChange(values, newValues);
    }
    // todo
    console.log('newValues', newValues);
    // console.log(columns);
    setValues(newValues);
    // 判读是否有改过数据
    if (JSON.stringify(oldValues) !== JSON.stringify(newValues)) {
      form.setFieldsValue(newValues);
    }

    if (editCmp?.formatValues) {
      editorStore.updateCurrentEditCmpValues(editCmp?.formatValues(newValues));
    } else {
      editorStore.updateCurrentEditCmpValues(newValues);
    }
    // 更新数据
  };

  const renderByType = (type: ModalType) => {
    const initialValues = editCmp?.getInitialValue
      ? editCmp?.getFieldsValue()
      : {};
    console.log('initialValues', initialValues);
    if ((type === 'component' || type === 'pageSet') && editCmp) {
      const formProps = editCmp?.formProps || {};
      const baseProps: any = {
        id: editCmp.id,
        form: form,
        submitter: false,
        initialValues: initialValues,
        'data-list': Array.from(editList),
        onValuesChange:
          type === 'component' ? onValuesChange : onPageValuesChange,
        'data-row':
          oldEditCmoId.current === editCmp?.id ? values : initialValues,
        ...formProps,
      };

      if (editCmp.render) {
        return <React.Fragment>{editCmp.render(baseProps)}</React.Fragment>;
      }

      return null;
    }
    if (type === 'componentList') {
      return <PanelList></PanelList>;
    }
    return null;
  };

  return (
    <div className="right-wrapper" id="edit-property">
      <div className="deco-editor-wrap">
        <div className="deco-component-title">
          <div className="deco-component-title__header">
            <span className="deco-component-title__name">
              {editCmpInfo ? editCmpInfo.name : '组件管理'}
            </span>
          </div>
          {editCmpInfo && editCmpInfo?.description ? (
            <div className="deco-component-title__msg">
              {editCmpInfo?.description}
            </div>
          ) : null}
        </div>
        <div className="deco-component-form">{renderByType(modalType)}</div>
      </div>
    </div>
  );
};
export default observer(PropertyPanel);
