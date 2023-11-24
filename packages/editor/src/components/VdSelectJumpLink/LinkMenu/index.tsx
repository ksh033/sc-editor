import { CloseOutlined } from '@ant-design/icons';
import './index.less';
import { SelectJumpLinkValue } from '../type';
import { useMemo } from 'react';

type LinkMenuProps = {
  onClose?: (val: SelectJumpLinkValue) => void;
  value?: SelectJumpLinkValue;
};

const LinkMenu: React.FC<LinkMenuProps> = (props) => {
  const { value, onClose } = props;

  const onHandleClose = (e: React.MouseEvent<HTMLElement>) => {
    if (value) {
      onClose?.(value);
    }
  };

  const title = useMemo(() => {
    return value?.linkTitle;
  }, [JSON.stringify(value)]);

  return (
    <a
      className="rc-choose-link-menu__link"
      draggable="false"
      rel="noopener noreferrer"
    >
      <div className="menu-tag">
        <div className="menu-tag-content">
          <span className="rc-choose-link-menu-tag-type" title={title}>
            商品
          </span>
          <span className="rc-choose-link-menu-tag-title" title={title}>
            {value?.linkTitle}
          </span>
        </div>
        <CloseOutlined onClick={onHandleClose} />
      </div>
    </a>
  );
};

export default LinkMenu;
