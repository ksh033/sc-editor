import { CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef } from 'react';
import Sortable from '../../utils/Sortable';
import ComItem from './ComItem';
import type { CompsGroup } from '@sceditor/element';
import { useStore } from '../../stores';
import { genNonDuplicateId } from '../../utils/common';
import sendToIframe from '../../utils/sendToIframe';

const ComsPanel: React.FC<any> = (props) => {
  const { comsStore, editorStore } = useStore();

  const comsList = comsStore.comsList;

  const divRef = useRef<HTMLDivElement>(null);

  const tempCmpKey = useRef<string | null>(null);

  const handleClick = (event: any, cmpKey: string) => {
    const item = comsStore.getCompByKey(cmpKey);
    if (item) {
      const flag = comsStore.addComsNum(cmpKey);
      if (flag) {
        editorStore.addToEdit(item);
      }
    }
  };

  const onTabActived = (id: string, actived: boolean) => {
    comsStore.updateTabActived(id, actived);
  };

  const getDragEle = (cmpKey: string) => {
    const item = comsStore.getCompByKey(cmpKey);
    if (item) {
      const newItem = new item();

      if (newItem.setId) {
        newItem.setId(genNonDuplicateId());
      }
      if (newItem.getInitialValue) {
        console.log('newItem.getInitialValue()', newItem.getInitialValue());
        newItem.setFieldsValue(newItem.getInitialValue());
      }
      return newItem;
    }
    return null;
  };

  useEffect(() => {
    if (divRef.current) {
      const parents = document.querySelectorAll('.com-list');
      parents.forEach((parent: Element) => {
        const item = parent as HTMLElement;
        Sortable.create(item, {
          draggable: '.drag-item',
          group: 'shared',
          sort: false,
          onChoose(evt) {
            const { key } = evt.item.dataset;
            if (key) {
              tempCmpKey.current = key;
              const data = getDragEle(key);
              if (data) {
                sendToIframe.postMessage('onChoose', data);
              }
            }
          },
          onEnd(ev) {
            console.log('mouseup onEnd');
            if (tempCmpKey.current != null) {
              handleClick(ev, tempCmpKey.current);
              tempCmpKey.current = null;
            }
            sendToIframe.postMessage('onEnd', {});
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
                key={com.cmpKey}
                onClick={handleClick}
                regeditCmpName={com.cmpKey}
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
