import { CloseCircleFilled, PlusOutlined } from '@ant-design/icons';
import ScImage from '../../baseComponents/ScImage';
import './index.less';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import type { BaseFromItemProps } from '@sceditor/core';
import type { SysEditorPropertyComponent } from '../interface';
import { CModal } from '@scboson/sc-element';
import SingleGoods, {
  onOpenSingleGoods,
} from '../VdSelectJumpLink/SingleGoods';
import { useRef } from 'react';

type VdGoodsListProps = BaseFromItemProps<any[]> & {};

const VdGoodsList: SysEditorPropertyComponent<VdGoodsListProps> = (props) => {
  const { value = [], onChange } = props;

  let temselectList = useRef<any[]>([]);

  const onHandleChange = (list: any) => {
    if (Array.isArray(list) && list.length > 0) {
      const map = new Set(value);
      const addValue = list.filter((it) => !map.has(it.goodsId));
      onChange && onChange([...addValue, ...value]);
    }
  };

  const handleAddClick = () => {
    onOpenSingleGoods({
      value: value,
      onChange: onHandleChange,
    });
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
