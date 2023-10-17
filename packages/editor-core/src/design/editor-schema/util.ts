import { ProFormColumnsType } from '@ant-design/pro-form';
import cloneDeep from 'lodash/cloneDeep';
import isNil from 'lodash/isNil';
import { type VdProFormColumnsType } from '../../manager'
const defaultFormItemProps = {
  className: 'deco-control-group',
};

const isNoStyle = (valueType: string) => {
  return valueType.startsWith('Vd');
};

const converFormItem = (
  list: VdProFormColumnsType[],
  columnList: ProFormColumnsType[]
) => {
  if (Array.isArray(list)) {
    list.forEach((it: VdProFormColumnsType) => {
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
  propsConfig: VdProFormColumnsType<any>[]
): ProFormColumnsType[] => {
  let itemInfos: VdProFormColumnsType<any>[] = cloneDeep(propsConfig);
  const newColumn: ProFormColumnsType[] = [];
  converFormItem(itemInfos, newColumn);

  return newColumn;
};
