import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ExtendVdFormItemProps } from '../VdFormItem';
import VdImgLink from '../VdImgLink';
import type { VdImgLinkEntryItem } from '../VdImgLink/type';
import CubeTemplate from './CubeTemplate';
import './index.less';
import {
  CompontentItem,
  getDefaultTemplateCompontents,
  templateMap,
} from './template';
import {
  registerEditorAttrCmp,
  EditorPropertyContext,
} from '@sceditor/editor-core';
import type { BaseFromItemProps } from '@sceditor/core';
import { SysEditorPropertyComponent } from '../interface';

type ValueState = {
  sub_entry: CompontentItem[];
  width: number;
  height: number;
};

export type VdMagicCubeLayoutProps = ExtendVdFormItemProps &
  BaseFromItemProps<ValueState> & {
    templateDataIndex: string;
  };

export const MethodLength = 8 - 1;
const VdMagicCubeLayout: SysEditorPropertyComponent<VdMagicCubeLayoutProps> = (
  props
) => {
  const {
    formItem,
    templateDataIndex,
    value = {
      sub_entry: [],
      width: 0,
      height: 0,
    },
    onChange,
  } = props;

  const editorValue = useContext(EditorPropertyContext);
  const templateId = useMemo(() => {
    return editorValue.rowData[templateDataIndex] || '0';
  }, [JSON.stringify(editorValue.rowData), templateDataIndex]);

  const [subEntryIndex, setSubEntryIndex] = useState<number>(0);

  const getValues = (id: string) => {
    const templateItemMap = templateMap[templateId];
    let newList = getDefaultTemplateCompontents(templateId);

    if (Array.isArray(value.sub_entry) && value.sub_entry.length > 0) {
      newList = newList.map((item, index) => {
        const valitem: any = value.sub_entry[index];
        if (valitem) {
          return {
            ...valitem,
            x: item.x,
            y: item.y,
            width: item.width,
            height: item.height,
          };
        }
        return item;
      });
    }
    return {
      width: templateItemMap.rowSpan,
      height: templateItemMap.colSpan,
      sub_entry: newList,
    };
  };

  useEffect(() => {
    if (templateId != null) {
      const newValues = getValues(templateId);
      // if (JSON.stringify(value) !== JSON.stringify(newValues)) {
      onChange?.(newValues);
      // }
      console.log('templateId', templateId);
    }
  }, [templateId]);

  const list = useMemo(() => {
    return Array.isArray(value.sub_entry) ? value.sub_entry : [];
  }, [JSON.stringify(value)]);

  const setList = (newList: CompontentItem[]) => {
    console.log(newList);
    if (Array.isArray(newList)) {
      onChange?.({
        ...value,
        sub_entry: newList,
      });
    }
  };

  const setDensity = (density: number) => {
    console.log(density);
    onChange?.({
      ...value,
      width: density,
      height: density,
    });
  };

  const onSubEnterHandleChange = (val: VdImgLinkEntryItem) => {
    if (val) {
      const newList = JSON.parse(JSON.stringify(list));
      let newItem = newList[subEntryIndex];
      newItem = Object.assign({}, newItem, val || {});
      newList.splice(subEntryIndex, 1, newItem);
      onChange?.({
        ...value,
        sub_entry: newList,
      });
    }
  };

  return (
    <React.Fragment>
      <CubeTemplate
        formItemName={formItem?.label}
        density={value.width}
        setDensity={setDensity}
        list={list}
        value={value}
        setList={setList}
        subEntryIndex={subEntryIndex}
        setSubEntryIndex={setSubEntryIndex}
        templateId={Number(templateId)}
      />
      <div className="vd-decorate-cube-add-warp">
        {Array.isArray(list) && list.length > 0 ? (
          <VdImgLink
            onChange={onSubEnterHandleChange}
            value={list[subEntryIndex]}
          ></VdImgLink>
        ) : null}
      </div>
    </React.Fragment>
  );
};
VdMagicCubeLayout.valueType = 'VdMagicCubeLayout';
registerEditorAttrCmp(VdMagicCubeLayout);
export default VdMagicCubeLayout;
