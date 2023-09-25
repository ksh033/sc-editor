import { CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { observer } from 'mobx-react-lite';
import React from 'react';
import ComItem from './ComItem';
// @ts-ignore
import { CompsGroup } from '@sceditor/element';
import { useStore } from '../../stores';

const ComsPanel: React.FC<any> = (props) => {
  const { comsStore, editorStore } = useStore();

  const comsList = comsStore.comsList;

  const handleClick = (event: any, cmpType: string) => {
    const item = comsStore.getCompByKey(cmpType);
    if (item) {
      const flag = comsStore.addComsNum(cmpType);
      if (flag) {
        editorStore.addToEdit(item);
      }
    }
  };

  const onTabActived = (id: string, actived: boolean) => {
    comsStore.updateTabActived(id, actived);
  };

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
      <div className="coms-lib-wrap" id="drag-box">
        {comsList.map((item) => {
          return comsTabs(item);
        })}
      </div>
    </div>
  );
};
export default observer(ComsPanel);
