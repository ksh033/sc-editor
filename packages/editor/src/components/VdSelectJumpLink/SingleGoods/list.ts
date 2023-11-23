import type { PageConfig } from '@scboson/sc-schema';

const pageConfig: PageConfig = {
  queryConfig: [
    {
      label: '业务场景',
      name: 'catalogScene',
      component: 'DictSelect',
      width: 'sm',
      props: {
        dictType: 'bizScene',
        placeholder: '请选择业务场景',
      },
    },
    {
      label: '商品',
      name: 'goodsSearchKey',
      width: 'md',
      component: 'Input',
      props: {
        placeholder: '输入商品名称/简称/编码/速记码',
      },
    },
  ],
  tableConfig: [
    {
      title: '商品名称',
      dataIndex: 'goodsName',
      key: 'goodsName',
      ellipsis: true,
      width: 200,
    },
    {
      title: '描述',
      dataIndex: 'goodsDesc',
      key: 'goodsDesc',
      ellipsis: true,
      width: 200,
    },
  ],
};
export default pageConfig;
