import { RadioProps } from "antd"
import { setSchemaTpl } from "./tpl"


console.log("initTpl")
setSchemaTpl('color', {
    title: '颜色',
    valueType: 'VdColor',
    fieldProps: {}
})

setSchemaTpl('date', {
    title: '日期',
    dataIndex: 'date',
    valueType: 'date',
    fieldProps: {
        style: { width: '100%' },
    },
})

setSchemaTpl('fill', {
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
})

setSchemaTpl('fontSize', {
    title: '字体大小',
    valueType: 'VdRadioIcon',
    fieldProps: {
        options: [
            {
                text: '大(16号)',
                value: 16,
                icon: 'deco-icon-font-x',
            },
            {
                text: '中(14号)',
                value: 14,
                icon: 'deco-icon-font-m',
            },
            {
                text: '小(12号)',
                value: 12,
                icon: 'deco-icon-font-s',
            },
        ],
    },
})

setSchemaTpl('fontWeight', {
    title: '加粗',
    valueType: 'VdRadioIcon',
    fieldProps: {
        options: [
            {
                text: '常规体',
                value: 'normal',
                icon: 'deco-icon-font-regular',
            },
            {
                text: '加粗体',
                value: 'bold',
                icon: 'deco-icon-font-bold',
            },
        ],
    },
})

setSchemaTpl<RadioProps>('location', {
    title: '显示位置',
    dataIndex: 'location',
    valueType: 'VdRadioIcon',
    fieldProps: {
        options: [
            { text: '居左显示', value: 'left', icon: 'deco-icon-align-left' },
            { text: '居中显示', value: 'center', icon: 'deco-icon-align-center' },
            { text: '居右显示', value: 'right', icon: 'deco-icon-align-right' },
        ],
    },
}
)

setSchemaTpl('needAll',{
    title: '全部',
    valueType: 'VdCheckBox',
  })


export {}