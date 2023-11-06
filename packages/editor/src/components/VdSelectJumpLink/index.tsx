import { Fragment, useCallback, useMemo, useRef, useState } from 'react';
import { Button, Dropdown, Input } from 'antd';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import classnames from 'classnames';
import { SysEditorPropertyComponent } from '../interface';
import { VdSelectJumpLinkProps } from './type';
import { items } from './data';
import './index.less';
import SingleGoods from './SingleGoods';

/** 选择跳转链接 */
const VdSelectJumpLink: SysEditorPropertyComponent<VdSelectJumpLinkProps> = (
  props
) => {
  const { type = 'button', btnText = '选择跳转链接' } = props;

  const [open, setOpen] = useState<boolean>(false);

  const ref = useRef<any>();

  const map: Record<string, () => React.ReactNode> = {
    'single-goods': () => {
      return <SingleGoods ref={ref}></SingleGoods>;
    },
  };

  return (
    <Dropdown
      menu={{ items }}
      placement="bottomLeft"
      open={open}
      onOpenChange={setOpen}
    >
      <Button type={type === 'link' ? 'link' : 'primary'} size="small">
        {btnText}
      </Button>
    </Dropdown>
  );
};

VdSelectJumpLink.valueType = 'VdSelectJumpLink';

registerEditorAttrCmp(VdSelectJumpLink);
export default VdSelectJumpLink;
