import { VdProFormColumnsType } from '../interface/index';

const fill: VdProFormColumnsType = {
  title: '填充',
  valueType: 'VdRadioIcon',
  fieldProps: {
    options: [
      {
        text: '填充',
        value: 'cover',
        icon: 'deco-icon-img-cover',
      },
      {
        text: '周边留白',
        value: 'contain',
        icon: 'deco-icon-img-contain',
      },
    ],
  },
};
export default fill;
