import { ProFormColumnsType } from '@ant-design/pro-form';
import ParentSchemCmp from '../../base/ParentSchemCmp';
import { VdProFormColumnsType } from '../../interface';
import { spellNamePath } from '../../utils';
import { SysComponents, components } from '@sceditor/cmp-center';
@components(SysComponents.Video,'视频')
class Video extends ParentSchemCmp {
  // cmpType: string = 'Video';
  // cmpName: string = '视频';
  propsConfig: VdProFormColumnsType[] = [
    {
      title: '视频',
      dataIndex: 'type',
      valueType: 'VdRadioIcon',
      formItemProps: {
        style: { marginBottom: 0 },
      },
      fieldProps: {
        styles: {
          padding: '12px 0',
        },
        showValue: false,
        options: [
          { text: '选择视频', value: 'select' },
          { text: '视频地址', value: 'link' },
        ],
      },
    },
    {
      title: '视频地址',
      dataIndex: 'video_obj',
      valueType: 'VdUpload',
      formItemProps: {
        help: '建议上传清晰度在720P以上的视频',
        rules: [
          {
            required: true,
            message: '请添加视频',
          },
        ],
      },
      fieldProps: {
        accept: 'video/*',
      },
    },
    {
      title: '视频地址',
      dataIndex: 'remote_url',
      valueType: 'VdVideoLink',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '请填写视频地址',
          },
          {
            pattern: /\.(mp4|MP4)$/,
            message: '不支持的视频',
          },
        ],
      },
    },
    {
      title: '封面',
      dataIndex: 'show_cover',
      valueType: 'VdRadioIcon',
      fieldProps: {
        styles: {
          padding: '12px 0',
        },
        showValue: false,
        options: [
          { text: '默认', value: false },
          { text: '选择图片', value: true },
        ],
      },
    },
    {
      title: '封面图片',
      dataIndex: 'cover_image',
      valueType: 'VdUpload',
      formItemProps: {
        help: '建议图宽高比例与视频宽高比一致',
        rules: [
          {
            required: true,
            message: '请添加封面',
          },
        ],
      },
    },
    {
      valueType: 'divider',
    },
    {
      title: '播放设置',
      valueType: 'group',
      fieldProps: { collapsible: true, expandIconPosition: 'end' },
      columns: [
        {
          dataIndex: 'show_progress',
          title: '进度条',
          valueType: 'VdSwitch',
        },
        {
          dataIndex: 'autoplay',
          title: '自动播放',
          valueType: 'VdSwitch',
          fieldProps: {
            valueMap: {
              true: '已开启',
              false: '已关闭',
            },
          },
        },
      ],
    },
    {
      title: '样式设置',
      valueType: 'group',
      fieldProps: { collapsible: true, expandIconPosition: 'end' },
      columns: [
        {
          dataIndex: 'corner_type',
          title: '视频倒角',
          valueType: 'VdRadioIcon',
          fieldProps: {
            options: [
              {
                text: '直角',
                value: 'straight',
                icon: 'deco-icon-corner-straight',
              },
              {
                text: '圆角',
                value: 'round',
                icon: 'deco-icon-corner-round',
              },
            ],
          },
        },
        {
          title: '页面边距',
          valueType: 'VdSlider',
          dataIndex: 'page_margin',
          fieldProps: {
            max: 30,
          },
        },
      ],
    },
  ];
  getPropsConfig(columns: ProFormColumnsType<any>[], record: any) {
    const newC: any[] = columns
      .map((it: any) => {
        const dataIndex = spellNamePath(it.dataIndex);
        if (record['type'] === 'select' && dataIndex === 'remote_url') {
          return null;
        }
        if (record['type'] === 'link' && dataIndex === 'video_obj') {
          return null;
        }
        if (record['show_cover'] === false && dataIndex === 'cover_image') {
          return null;
        }
        return it;
      })
      .filter((it) => it != null);
    return newC;
  }
  getInitialValue() {
    return {
      height: 30,
      show_cover: false,
      type: 'select',
      show_progress: true,
      autoplay: true,
      corner_type: 'straight',
      page_margin: 0,
    };
  }
}

Video.info = {
  icon: 'https://img01.yzcdn.cn/upload_files/2022/06/17/FpyONVTUzVGqkAwqoh-RQeclXPo5.png',
  name: '视频',
  description:
    '自动播放仅小程序v2.86.7及以上版本生效，其他部分功能优化（竖版视频、隐藏进度条等）支持H5和v2.86.7及以上版本的小程序',
  cmpType: 'Video',
  maxNum: 50,
  usedNum: 0,
  status: '',
};

export default Video;
