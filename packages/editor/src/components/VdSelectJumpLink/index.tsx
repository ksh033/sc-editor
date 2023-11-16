import { Fragment, useRef, useState } from 'react';
import { Button, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import SingleGoods from './SingleGoods';
import { CModal } from '@scboson/sc-element';
import classnames from 'classnames';
import { SysEditorPropertyComponent } from '../interface';
import type { VdSelectJumpLinkProps } from './type';
import { items } from './data';
import './index.less';

/** 选择跳转链接 */
const VdSelectJumpLink: SysEditorPropertyComponent<VdSelectJumpLinkProps> = (
  props
) => {
  const { type = 'button', btnText = '选择跳转链接' } = props;

  const [open, setOpen] = useState<boolean>(false);

  const map: Record<string, () => void> = {
    'single-goods': () => {
      CModal.show({
        title: '选择商品',
        content: SingleGoods,
        onOk: () => {},
        width: '900px',
      });
    },
  };

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('e', e);
    const key = e.key;
    if (map[key]) {
      map[key]();
    }
  };

  return (
    <Fragment>
      <Dropdown
        menu={{ items, onClick: handleMenuClick }}
        placement="bottomLeft"
        open={open}
        onOpenChange={setOpen}
      >
        <Button type={type === 'link' ? 'link' : 'primary'} size="small">
          {btnText}
        </Button>
      </Dropdown>
    </Fragment>
  );
};

VdSelectJumpLink.valueType = 'VdSelectJumpLink';

registerEditorAttrCmp(VdSelectJumpLink);
export default VdSelectJumpLink;
