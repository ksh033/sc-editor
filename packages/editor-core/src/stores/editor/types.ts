import type { CmpInfo,EditorBaseType } from "@sceditor/element";
// 组件分组
export interface CompsClassGroup {
    id: string;
    actived: boolean;
    name: string;
    list: string[];
  }
  /** 左侧组件显示的信息 */
  export interface CompsGroup {
    id: string;
    name: string;
    actived: boolean;
    list: CmpInfo[];
  }
  