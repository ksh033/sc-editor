import { Fragment, useRef, useState } from 'react';
import { Button, Dropdown, Input } from 'antd';
import type { MenuProps } from 'antd';
import { registerEditorAttrCmp } from '@sceditor/editor-core';
import { onOpenSingleGoods } from './SingleGoods';
import LinkMenu from './LinkMenu';
import type { SysEditorPropertyComponent } from '../interface';
import type { VdSelectJumpLinkProps } from './type';
import type { LinkSelectTypeEnum } from '../../interface/common';
import { items } from './data';
import './index.less';

/** 选择跳转链接 */
const VdSelectJumpLink: SysEditorPropertyComponent<VdSelectJumpLinkProps> = (
  props
) => {
  const { type = 'button', btnText = '选择跳转链接', value, onChange } = props;

  const [open, setOpen] = useState<boolean>(false);

  const map: Partial<Record<LinkSelectTypeEnum, () => void>> = {
    GOODS: () => {
      // 单个商品选择
      onOpenSingleGoods({
        value: value && value?.innerContent ? [value?.innerContent] : [],
        onChange: (val: any[]) => {
          if (Array.isArray(val) && val.length === 1) {
            const item = val[0];
            onChange?.({
              innerContent: item,
              linkTitle: item.goodsName,
              linkSelectType: 'GOODS',
              linkConfigId: item.goodsId,
              linkType: 'APP',
            });
          }
        },
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
  /** 删除 */
  const onDelete = () => {
    onChange?.();
  };

  const foramt = (type: LinkSelectTypeEnum) => {
    const renderMap: Partial<
      Record<LinkSelectTypeEnum, () => React.ReactNode>
    > = {
      GOODS: () => {
        return <LinkMenu value={value} onClose={onDelete}></LinkMenu>;
      },
      GOODS_GROUP: () => {
        return <LinkMenu></LinkMenu>;
      },
    };
    if (renderMap[type]) {
      return renderMap[type]?.();
    }
    return null;
  };

  return (
    <Fragment>
      {value && value.linkConfigId ? (
        <div className="rc-choose-link-menu">
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            placement="bottomLeft"
            open={open}
            onOpenChange={setOpen}
          >
            <Button
              size="small"
              type="primary"
              className="rc-choose-link-menu-btn"
            >
              修改
            </Button>
          </Dropdown>
          {value && value?.linkSelectType && foramt(value?.linkSelectType)}
        </div>
      ) : (
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
      )}
    </Fragment>
  );
};

VdSelectJumpLink.valueType = 'VdSelectJumpLink';

registerEditorAttrCmp(VdSelectJumpLink);
export default VdSelectJumpLink;
