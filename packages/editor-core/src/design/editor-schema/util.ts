import { ProFormColumnsType } from '@ant-design/pro-form';
import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';
const defaultFormItemProps = {
  className: 'deco-control-group',
};

const isNoStyle = (valueType: string) => {
  return valueType.startsWith('Vd');
};

const converFormItem = (
  list: ProFormColumnsType[],
  columnList: ProFormColumnsType[]
) => {
  if (Array.isArray(list)) {
    list.forEach((it: ProFormColumnsType) => {
      // const valueType = it.valueType;
      const { columns, ...restIt } = it;
      let newItem: ProFormColumnsType<any, any> = restIt;
      let newColumns: ProFormColumnsType[] = [];
      if (Array.isArray(columns) && columns.length > 0) {
        converFormItem(columns, newColumns);
        newItem.columns = newColumns;
      }
      if (isNil(newItem.formItemProps)) {
        newItem.formItemProps = {};
      }
      if (isNil(newItem.fieldProps)) {
        newItem.fieldProps = {};
      }

      const formItemProps = Object.assign(
        {},
        defaultFormItemProps,
        newItem.formItemProps
      );
      newItem.formItemProps = formItemProps;
      if (it && typeof it.valueType === 'string') {
        const valueType: string = it.valueType || '';
        if (isNoStyle(valueType)) {
          newItem.formItemProps = {
            ...formItemProps,
            label: undefined,
          };
          newItem.fieldProps['formItem'] = {
            name: it.dataIndex,
            label: it.title,
          };
          if (valueType === 'VdDivider') {
            newItem.formItemProps.noStyle = true;
          }
        }
      }

      columnList.push(newItem);
    });
  }
};
export const filterPageConfig = (
  propsConfig: ProFormColumnsType<any>[]
): ProFormColumnsType[] => {
  let itemInfos: ProFormColumnsType<any>[] = cloneDeep(propsConfig);
  const newColumn: ProFormColumnsType[] = [];
  converFormItem(itemInfos, newColumn);

  return newColumn;
};

/** 过滤单个 */
export const filterItemPageConfig = (
  propsConfig: ProFormColumnsType<any>[],
  fn: (column: ProFormColumnsType, record: any) => ProFormColumnsType | null,
  record: any
): ProFormColumnsType[] => {
  if (Array.isArray(propsConfig)) {
    const newList = propsConfig
      .map((it) => {
        if (Array.isArray(it.columns) && it.columns.length > 0) {
          it.columns = filterItemPageConfig(it.columns, fn, record);
        }
        return fn(it, record);
      })
      .filter((it) => it != null);

    return newList as ProFormColumnsType[];
  }
  return [];
};
