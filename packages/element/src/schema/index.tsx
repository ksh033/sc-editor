import { ClassType, CompsClassGroup, CompsGroup } from '../interface';

import AdImage from './AdImage';
import Coupon from './Coupon';
import CrowdImage from './CrowdImage';
import ElevatorNav from './ElevatorNav';
import EnterShop from './EnterShop';
import GoodsLayout from './GoodsLayout';
import ImageTextNav from './ImageTextNav';
import MagicCube from './MagicCube';
import Notice from './Notice';
import PageInfo from './PageInfo';
import Title from './PTitle';
import Search from './Search';
import Video from './VideoCmp';
import White from './White';
/** 具体组件配置 */
const BaseCompClassGroup: CompsClassGroup[] = [
  {
    id: 'base-coms',
    name: '基础组件',
    actived: true,
    list: [
      Title,
      ElevatorNav,
      GoodsLayout,
      CrowdImage,
      AdImage,
      ImageTextNav,
      MagicCube,
      White,
      Search,
      EnterShop,
      Notice,
      Video,
      // NearbyShop,
    ],
  },
  {
    id: 'ump-coms',
    name: '营销组件',
    actived: true,
    list: [Coupon],
  },
];
/** 左侧组件显示 */
const BaseCompGroup: CompsGroup[] = BaseCompClassGroup.map(
  (it: CompsClassGroup) => {
    const list = it.list.map((purClass) => {
      return purClass.info;
    });
    return {
      id: it.id,
      name: it.name,
      actived: it.actived,
      list: list,
    };
  }
);
/** 组件的映射表 */
const BaseCompMap = new Map<String, ClassType>();
BaseCompClassGroup.forEach((it: CompsClassGroup) => {
  it.list.forEach((purClass) => {
    BaseCompMap.set(purClass.info.cmpType, purClass);
  });
});

export { BaseCompMap, BaseCompGroup, PageInfo };
