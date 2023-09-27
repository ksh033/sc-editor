
export enum SysComponents {     
    Title="Title",
    MagicCube="MagicCube",
    AdImage="AdImage",
    /**
     * 商品搜索
     */
    Search="Search",
    /**
     * 公告
     */
    Notice="Notice",
    /**
     * 视频
     */
    Video="Video",
    /**
     * 辅助空白
     */
    White="White",
    Goods="Goods",
    ElevatorNav="ElevatorNav",
    EnterShop="EnterShop",
    ImageTextNav="ImageTextNav",
    GoodsLayout="GoodsLayout",
    CrowdImage="CrowdImage",
    Coupon="Coupon",
    CustomNav="CustomNav",
    NearbyShop="NearbyShop",
    /**
     * 
     */
    PageInfo="PageInfo"
}
export type SysComponentsEnumType= keyof typeof SysComponents