import { useEffect, useMemo, useRef, useState } from 'react';
import { useSetState } from 'ahooks';
import { Position, Rnd } from 'react-rnd';
import classnames from 'classnames';
import { DraggableData, DraggableEvent } from 'react-draggable';
import { PlusOutlined, DeleteOutlined } from '@ant-design/icons';
import { ResizeDirection } from 're-resizable';
import { BaseImage, JumpLink } from '../../../interface/common.d';
import ScImage from '../../../baseComponents/ScImage';
import VdSelectJumpLink from '../../VdSelectJumpLink';
import './index.less';

const classPrefix = 'add-heatzone';

type AddHeatZoneProps = {
  data?: BaseImage;
  value?: JumpLink[];
  onChange?: (val: JumpLink[]) => void;
};

type HotAreaLink = JumpLink & {
  /** 是否显示操作 */
  showOptPopover: boolean;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
};

type AddHeatZoneState = {
  initMinHeight: number;
  initMinWidth: number;
  /** 图片区域大小 */
  imgAreaHeight?: number;
  maxHeight: number;
  hotAreas: HotAreaLink[];
};

/** 添加热区 */
const AddHeatZone: React.FC<AddHeatZoneProps> = (props) => {
  const { data = {} } = props;

  const valueRef = useRef<JumpLink[]>([]);
  const [state, setState] = useSetState<AddHeatZoneState>({
    initMinHeight: 20,
    initMinWidth: 32,
    maxHeight: 375,
    hotAreas: [],
  });

  /** 添加区域 */
  const addHotArea = () => {
    const hotAreas: HotAreaLink[] = state.hotAreas;
    const el = document.querySelector(
      '.image-content .decorate-hot-area-image-editor__dialog-image'
    );
    if (el) {
      const clientWidth = el.clientWidth;
      const clientHeight = el.clientHeight;
      let startX = 0;
      let startY = 0;
      let endX = 50;
      let endY = 50;
      let verifyFlag = !1;
      let cy = 0;

      const diff = function (tempY) {
        if (verifyFlag) {
          cy = tempY;
          return 'break';
        }
        let a = Number.MAX_SAFE_INTEGER;
        for (
          let cx = 0;
          cx < clientWidth - 50 &&
          ((startX = cx),
          (startY = tempY),
          (endX = cx + 50),
          (endY = tempY + 50),
          (Array.isArray(hotAreas) && hotAreas.length > 0
            ? hotAreas.every(function (e) {
                const n = [startX, startY],
                  u = [endX, startY],
                  s = [startX, endY],
                  d = [endX, endY];
                if (
                  (n[0] >= e.startX &&
                    n[0] <= e.endX &&
                    n[1] >= e.startY &&
                    n[1] <= e.endY) ||
                  (u[0] >= e.startX &&
                    u[0] <= e.endX &&
                    u[1] >= e.startY &&
                    u[1] <= e.endY) ||
                  (s[0] >= e.startX &&
                    s[0] <= e.endX &&
                    s[1] >= e.startY &&
                    s[1] <= e.endY) ||
                  (d[0] >= e.startX &&
                    d[0] <= e.endX &&
                    d[1] >= e.startY &&
                    d[1] <= e.endY)
                ) {
                  cx = e.endX;
                  a = Math.min(e.endY, a);
                  cy = tempY;
                  return !1;
                } else {
                  a = Math.min(Number.MAX_SAFE_INTEGER, a);
                  cy = tempY;
                  return !0;
                }
              })
            : false) && (verifyFlag = !0),
          !verifyFlag);
          cx++
        ) {}
        if (a !== Number.MAX_SAFE_INTEGER) {
          tempY = a < tempY ? tempY : a;
          cy = tempY;
        }
        return null;
      };

      while (cy < clientHeight - 50) {
        if ('break' === diff(cy)) break;
        cy++;
      }

      if (!verifyFlag) {
        (startX = 0), (startY = 0), (endX = 50), (endY = 50);
      }
      hotAreas.push({
        startX: startX,
        startY: startY,
        endX: endX,
        endY: endY,
        showOptPopover: !1,
      });
      console.log('hotAreas', hotAreas);
      setState({
        hotAreas: hotAreas,
      });
    }
  };

  const onDelete = (index: number) => {
    const hotAreas: HotAreaLink[] = JSON.parse(JSON.stringify(state.hotAreas));
    hotAreas.splice(index, 1);
    setState({
      hotAreas: hotAreas,
    });
  };

  /** 去除选中状态 */
  const handleHideHotAreaOptPopover = () => {
    const hotAreas = state.hotAreas.map((it) => {
      return {
        ...it,
        showOptPopover: !1,
      };
    });
    setState({
      hotAreas: hotAreas,
    });
  };

  const checkHotAreaPosition = (index: number) => {
    const el = document.getElementsByClassName(
      'decorate-hot-area-image-editor__dialog-image'
    )[0];
    const hotAreas: HotAreaLink[] = JSON.parse(JSON.stringify(state.hotAreas));
    const it = hotAreas[index];
    if (el && it) {
      const clientWidth = el.clientWidth;
      const clientHeight = el.clientHeight;

      it.startX < 0 && (it.startX = 0);
      it.startY < 0 && (it.startY = 0);
      it.endX > clientWidth && (it.endX = clientWidth);
      it.endY > clientHeight && (it.endY = clientHeight);

      hotAreas.splice(index, 1, it);

      setState({
        hotAreas: hotAreas,
      });
    }
  };

  const handleHotAreaResize = (
    ele: HTMLElement,
    dir: ResizeDirection,
    index: number
  ) => {
    const hotAreas: HotAreaLink[] = JSON.parse(JSON.stringify(state.hotAreas));
    const offsetWidth = ele.offsetWidth;
    const offsetHeight = ele.offsetHeight;
    const it = hotAreas[index];
    if (ele && it) {
      const map: Record<ResizeDirection, () => void> = {
        topRight: () => {
          it.endX = it.startX + offsetWidth;
          it.startY = it.endY - offsetHeight;
        },
        bottomRight: () => {
          it.endX = it.startX + offsetWidth;
          it.endY = it.startY + offsetHeight;
        },
        topLeft: () => {
          it.startX = it.endX - offsetWidth;
          it.startY = it.endY - offsetHeight;
        },
        bottomLeft: () => {
          it.startX = it.endX - offsetWidth;
          it.endY = it.startY + offsetHeight;
        },
        top: () => {
          it.startY = it.endY - offsetHeight;
        },
        bottom: () => {
          it.endY = it.startY + offsetHeight;
        },
        left: () => {
          it.startX = it.endX - offsetWidth;
        },
        right: () => {
          it.endX = it.startX + offsetWidth;
        },
      };

      if (map[dir]) {
        map[dir]();
        hotAreas.splice(index, 1, it);
        setState({
          hotAreas: hotAreas,
        });
      }
    }
  };
  /** 关闭弹窗 */
  const triggerAllPopover = (v: boolean) => {};

  /** 监听图片数据 */
  useEffect(() => {
    if (data) {
      const imageWidth = Number(data.imageWidth);
      const n = Math.floor((375 * Number(data.imageHeight)) / imageWidth);
      const o = window.innerHeight - 180;
      const imgAreaHeight = Math.min(o, n) < 316 ? 316 : Math.min(o, n);
      setState({
        imgAreaHeight: imgAreaHeight,
        maxHeight: n,
      });
    }
  }, [JSON.stringify(data)]);

  /** 移动完处理 */
  const handleHotAreaDragStop = (data: DraggableData, idx: number) => {
    let hotAreas: HotAreaLink[] = JSON.parse(JSON.stringify(state.hotAreas));
    hotAreas = hotAreas.map((el, n) => {
      const newEl = Object.assign({}, el);
      if (idx === n) {
        const old = {
          startX: newEl.startX,
          startY: newEl.startY,
          endX: newEl.endX,
          endY: newEl.endY,
        };
        const width = newEl.endX - newEl.startX;
        const height = newEl.endY - newEl.startY;

        newEl.startX = data.x;
        newEl.endX = data.x + width;
        newEl.startY = data.y;
        newEl.endY = data.y + height;

        if (
          newEl.endX === old.endX &&
          newEl.endY === old.endY &&
          newEl.startX === old.startX &&
          newEl.startY === old.startY
        ) {
          newEl.showOptPopover = true;
        } else {
          newEl.showOptPopover = false;
        }
      } else {
        newEl.showOptPopover = false;
      }
      return newEl;
    });
    setState({
      hotAreas: hotAreas,
    });
  };

  return (
    <div className={classPrefix}>
      <div className={`${classPrefix}-left`} id="dragview">
        <div
          className="image-content"
          style={{
            width: 375,
            height: Number(state.imgAreaHeight || 0),
          }}
        >
          <div className="image-area">
            <ScImage
              preview={false}
              src={data?.imageUrl}
              className="decorate-hot-area-image-editor__dialog-image"
            ></ScImage>

            {state.hotAreas.map((it, idx) => {
              const width = it.endX - it.startX;
              const height = it.endY - it.startY;
              return (
                <Rnd
                  key={`rn-${idx}`}
                  bounds="#dragview"
                  size={{
                    width: Number(width || 0),
                    height: Number(height || 0),
                  }}
                  // className="new-image-ad-hotarea-rnd"
                  className={classnames('new-image-ad-hotarea-rnd', {
                    active: it.showOptPopover,
                  })}
                  position={{
                    x: Number(it.startX || 0),
                    y: Number(it.startY || 0),
                  }}
                  maxWidth={375}
                  maxHeight={state.maxHeight}
                  minWidth={state.initMinWidth}
                  minHeight={state.initMinHeight}
                  onDragStop={(e: DraggableEvent, data: DraggableData) => {
                    handleHotAreaDragStop(data, idx);
                  }}
                  onDragStart={() => {}}
                  onDrag={() => {
                    it.showOptPopover && handleHideHotAreaOptPopover();
                  }}
                  onResizeStop={() => {
                    checkHotAreaPosition(idx);
                  }}
                  onResize={(
                    e: MouseEvent | TouchEvent,
                    dir: ResizeDirection,
                    elementRef: HTMLElement
                  ) => {
                    handleHideHotAreaOptPopover();
                    handleHotAreaResize(elementRef, dir, idx);
                    // if (it.showOptPopover) {
                    //   handleHideHotAreaOptPopover();
                    //   handleHotAreaResize(elementRef, dir, idx);
                    // }
                  }}
                >
                  <div className="area-index">123</div>
                  <div className="border-area">
                    <div className="border-area-top-left"></div>
                    <div className="border-area-top-right"></div>
                    <div className="border-area-bottom-left"></div>
                    <div className="border-area-bottom-right"></div>
                  </div>
                </Rnd>
              );
            })}
          </div>
        </div>
      </div>
      <div className={`${classPrefix}-right`}>
        <div className={`${classPrefix}-right-fixed-area`}>
          <div className={`${classPrefix}-right-title`}>热区管理</div>
          <div className="add-area" onClick={addHotArea}>
            <PlusOutlined />
            添加地区
          </div>
        </div>
        <div className={`${classPrefix}-content`}>
          {state.hotAreas.map((it, index) => {
            return (
              <div
                className={`${classPrefix}-area-item`}
                key={`arae-item-${index}`}
              >
                <label>热区{index + 1}：</label>
                {/* 链接跳转 */}
                <VdSelectJumpLink></VdSelectJumpLink>
                <DeleteOutlined
                  className="remove-icon"
                  onClick={() => {
                    onDelete(index);
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AddHeatZone;
