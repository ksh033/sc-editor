import { CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef } from 'react';
// import Sortable from '../../utils/Sortable';
import Sortable from 'sortablejs';
import ComItem from './ComItem';
import { useStore } from '../../stores';
//import sendToIframe from '../../utils/sendToIframe';
import {EditorContext} from '../../manager'
import type {CompsGroup} from '../../design'

const ComsPanel: React.FC<any> = (props:any) => {

  const {manager}=useContext(EditorContext)

  const { comsStore } =useStore();

  const comsList = comsStore.comsList;

  const divRef = useRef<HTMLDivElement>(null);

  const tempcmpType = useRef<string | null>(null);

  const handleClick = (_event: any, cmpType: string) => {
    manager.insterNode({cmpType})
  };

  const onTabActived = (id: string, actived: boolean) => {
    comsStore.updateTabActived(id, actived);
  };

  // const getDragEle = (cmpType: string) => {
  //   const item = comsStore.getCompByKey(cmpType) as any;
  //   if (item) {
  //     const newItem:BaseSchemaClass = new item();

  //     // if (newItem.setId) {
  //     //   newItem.setId(genNonDuplicateId());
  //     // }
  //     // if (newItem.getInitialValue) {
  //     //   console.log('newItem.getInitialValue()', newItem.getInitialValue());
  //     //   newItem.setFieldsValue(newItem.getInitialValue());
  //     // }
  //     return newItem.getData();
  //   }
  //   return null;
  // };

  useEffect(() => {
    if (divRef.current) {
      const parents = document.querySelectorAll('.com-list');
      parents.forEach((parent: Element) => {
        const item = parent as HTMLElement;
        Sortable.create(item, {
          draggable: '.drag-item',
          group: {
            name: 'shared',
            put: false,
          },
          sort: false,
          forceFallback: true,
          // @ts-ignore
          supportPointer: false,
          dragoverBubble: true,
          dropBubble: true,
          onChoose(evt) {
            const { key } = evt.item.dataset;
            if (key && key !== tempcmpType.current) {
              tempcmpType.current = key;
     
              const newNode =manager.createNode(key)
              if (newNode) {
               // sendToIframe.postMessage('onChoose', data);
               const data=newNode.getData()
               manager?.message.emit('StartDrag',data)
              }
            }
          },
          onEnd(ev) {
            console.log('mouseup onEnd');
            if (tempcmpType.current != null) {
              tempcmpType.current = null;
            }
          //  sendToIframe.postMessage('onEnd', {});
            manager?.message.emit('DragEnd',{})
          },
        });
      });
    }
  }, [divRef.current]);

  const comsTabs = (tab: CompsGroup) => {
    const { name, id, list, actived } = tab;
    return (
      <div
        className={classnames('coms-lib', {
          'coms-lib-active': actived,
        })}
        key={id}
      >
        <div
          className="coms-lib-tab"
          onClick={() => {
            onTabActived(id, !actived);
          }}
        >
          <div className="coms-lib-tab-icon">
            <CaretDownOutlined></CaretDownOutlined>
          </div>

          <span className="coms-lib-tab-name">{name}</span>
        </div>
        <div className="com-list">
          {list.map((com: any) => {
            return (
              <ComItem
                item={com}
                key={com.cmpType}
                onClick={handleClick}
                regeditCmpName={com.cmpType}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="left-wrapper">
      <div className="coms-lib-wrap" id="drag-box" ref={divRef}>
        {comsList.map((item) => {
          return comsTabs(item);
        })}
      </div>
    </div>
  );
};
export default observer(ComsPanel);
