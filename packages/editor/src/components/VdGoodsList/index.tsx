import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import ScImage from '../../baseComponents/ScImage';
import './index.less';
import { goodsList } from './list';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import type { BaseFromItemProps } from '@sceditor/core';
import type { SysEditorPropertyComponent } from '../interface';

type VdGoodsListProps = BaseFromItemProps<any[]> & {};

const VdGoodsList: SysEditorPropertyComponent<VdGoodsListProps> = (props) => {
  const { value = [], onChange } = props;

  const handleAddClick = () => {
    if (Array.isArray(value) && value.length <= 20) {
      var num = Math.floor(Math.random() * 20);

      const item = goodsList[num];
      if (item) {
        const index = value.findIndex((it) => it.goodsId === item.goodsId);
        if (index === -1) {
          onChange?.([...value, item]);
        } else {
          handleAddClick();
        }
      } else {
        handleAddClick();
      }
    }
  };

  const onHandleDetele = (key: string) => {
    if (Array.isArray(value)) {
      const newList = value.filter((it) => it.goodsId !== key);
      onChange?.([...newList]);
    }
  };

  return (
    <div className="deco-goods-list-view">
      <div className="deco-goods-list-title">商品管理</div>
      <div className="deco-goods-list">
        {value.map((it) => {
          return (
            <div className="deco-goods-list-item" key={it.goodsId}>
              <div className="deco-goods-list-item-image">
                <ScImage src={it.goodsThumb}></ScImage>
              </div>
              <CloseCircleFilled
                className="deco-editor-list-item__delete"
                onClick={() => {
                  onHandleDetele(it.goodsId);
                }}
              />
            </div>
          );
        })}
        <div
          className="deco-goods-list-item deco-goods-list-add-item"
          onClick={handleAddClick}
        >
          <PlusOutlined />
        </div>
      </div>
    </div>
  );
};
VdGoodsList.valueType = 'VdGoodsList';
registerEditorAttrCmp(VdGoodsList);
export default VdGoodsList;
