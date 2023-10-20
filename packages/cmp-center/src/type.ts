
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

export enum MessageTypeEnum{
    /**
     * 开始拖动工具栏
     */
    StartDrag="StartDrag",
    /**
     * 鼠标移动
     */
     MouseMove='MouseMove',
     /**
      * 插入节点
      */
     InsterNode="InsterNode",
    /**
     * 更新节点
     */
    UpdateNode="UpdateNode",
    /**
     * 清除所有节点
     */
    ClearNodes="ClearNodes",
    /**
     * 删除节点
     */
    DeleteNode="DeleteNode",
   /**
     * 移动节点
     */
    MoveNode="MoveNode",
    /**
     * 更新页面配置
     */
    UpdatePageInfo="UpdatePageInfo",
    /**
     * 改变活动节点
     */
    ChangeActiveNode="ChangeActiveNode",

    /**
     * 复制节点
     */
    CopyNode="CopyNode",

        /**
         * 鼠标释放
         */
        MouseUp="MouseUp",
/**
 * 拖动结束
 */
    DragEnd="DragEnd",


}
export type SysComponentsEnumType= keyof typeof SysComponents

export type MessageType= keyof typeof MessageTypeEnum