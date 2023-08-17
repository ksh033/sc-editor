import { VdProFormColumnsType } from '../interface/index';

const fill: VdProFormColumnsType = {
  title: '填充',
  valueType: 'VdRadioIcon',
  fieldProps: {
    options: [
      {
        text: '填充',
        value: 'fillIn',
        icon: 'deco-icon-img-cover',
      },
      {
        text: '周边留白',
        value: 'margin',
        icon: 'deco-icon-img-contain',
      },
    ],
  },
};
export default fill;
