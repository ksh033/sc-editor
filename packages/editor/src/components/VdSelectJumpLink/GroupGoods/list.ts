import type { PageConfig } from '@scboson/sc-schema';

const pageConfig: PageConfig = {
  queryConfig: [
    {
      label: '分组名称',
      name: 'goodsGroupName',
      width: 'md',
      component: 'Input',
      props: {
        placeholder: '输入分组名称',
      },
    },
  ],
  tableConfig: [
    {
      title: '分组名称',
      dataIndex: 'goodsGroupName',
      key: 'goodsGroupName',
      ellipsis: true,
      width: 100,
    },
    {
      title: '商品数量',
      dataIndex: 'goodsGroupCount',
      key: 'goodsGroupCount',
      ellipsis: true,
      width: 200,
    },
    {
      title: '创建时间',
      dataIndex: 'crentTimes',
      key: 'crentTimes',
      ellipsis: true,
      width: 200,
    },
  ],
};
export default pageConfig;
