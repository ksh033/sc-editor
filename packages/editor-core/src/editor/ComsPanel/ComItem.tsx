import React, { useRef } from 'react';
import classnames from 'classnames';
import type { CmpInfo } from '../../design/editor-schema/BaseSchema';

import { useHover } from 'ahooks';
import { observer } from 'mobx-react-lite';

interface ComItemProps {
  item: CmpInfo;
  onClick?: Function;
  regeditCmpName: string;
}
const ComItem: React.FC<ComItemProps> = (props) => {
  const {
    item: { name, icon, maxNum, usedNum },
    regeditCmpName,
    onClick,
  } = props;

  const ref = useRef<any>();
  const isHovering = useHover(ref);

  const itemDragStartHandler = (event: React.DragEvent<HTMLDivElement>) => {
    onClick?.(event, regeditCmpName);
  };
  return (
    <div
      ref={ref}
      className={classnames('com-item', 'drag-item', {
        'com-item-active': isHovering,
      })}
      onClick={itemDragStartHandler}
      data-key={regeditCmpName}
    >
      <i
        className="com-item-icon"
        style={{ backgroundImage: `url(${icon})` }}
      ></i>
      <div className="com-item-name">{name}</div>
      <div className="com-item-num">
        {usedNum}/{maxNum}
      </div>
    </div>
  );
};

export default observer(ComItem);
