import { PlusOutlined } from '@ant-design/icons';
import { message } from 'antd';
import { UploadFile } from 'antd/es/upload/interface';
import { useLayoutEffect, useMemo, useState } from 'react';
import ScUpload from '../../baseComponents/ScUpload';
import { baseApi, imageUrl } from '../../utils/common';
import compute from '../../utils/compute';
import './index.less';
import { isImageFileType } from './utils';
import { EditorPropertyComponent, registerEditorAttrCmp } from '@sceditor/editor-core';

export type VdUploadFile = UploadFile<any> & {
  width?: number;
  height?: number;
  fileId: string;
};

export type VdUploadValue = VdUploadFile | VdUploadFile[];

export type VdUploadProps = {
  action?: string;
  value?: VdUploadValue;
  onChange?: (value?: VdUploadValue) => void;
  maxFiles?: number; // 最多上传几个配合 mode 类型为 multiple
  mode?: 'multiple' | 'single'; // single 上传一个 |  multiple 上传多个配合maxFiles使用
  disabled?: boolean; // 是否禁用
  maxSize?: number; // 上传文件大小
  videoMaxSize?: number; // 视频的文件大小
  uploadImmediately?: boolean; // 是否立即上传
  accept?: string; // 图片上传类型
  warnContent?: React.ReactNode | string;
  imgWidth?: { maxWidth?: number; minWidth?: number; width?: number };
  imgHeight?: { maxHeight?: number; minHeight?: number; height?: number };
};

const VdUpload: EditorPropertyComponent<VdUploadProps> = (props) => {
  const {
    action = `${baseApi}/file/api/file/upload`,
    value = [],
    maxFiles = 999,
    mode = 'single',
    maxSize = 3 * 1024 * 1024,
    videoMaxSize = 8 * 1024 * 1024,
    accept = 'image/*',
    imgWidth,
    imgHeight,
    uploadImmediately = true,
    onChange,
    ...restProps
  } = props;

  const headers: any = { 'app-version': '1.0' };
  headers['sys-code'] = 'common';

  const [fileList, setFileList] = useState<VdUploadFile[]>([]);

  const maxSizeM = compute.divide(maxSize, 1024 * 1024);
  const videoMaxSizeM = compute.divide(videoMaxSize, 1024 * 1024);

  const maxNum = useMemo(() => {
    return mode === 'single' ? 1 : maxFiles;
  }, [mode, maxFiles]);

  useLayoutEffect(() => {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        setFileList([]);
      } else {
        setFileList(value);
      }
    } else {
      setFileList([value]);
    }
  }, [JSON.stringify(value)]);

  const maxSizeCheck = (file: any) => {
    const isImg = isImageFileType(file.type);
    if (isImg) {
      return file.size <= maxSize;
    }
    const isVideo = file.type.indexOf('video') > -1;
    if (isVideo) {
      return file.size <= videoMaxSize;
    }

    return file.size <= maxSize;
  };

  const fileFormatObjet: any = (file: any, index: number) => {
    let result: any = file;
    if (file.response && file.response.success) {
      result = file.response.data;
      return {
        uid: result.fileInfoId + index,
        name: result.fileName,
        url: imageUrl(result.fileUrl || ''),
        thumbUrl: imageUrl(result.thumbnailUrl),
        thumbnailUrl: result.thumbnailUrl,
        fileUrl: result.fileUrl,
        status: 'done',
      };
    } else {
      return result;
    }
  };

  const handleChange = async ({
    fileList: list,
  }: {
    fileList: UploadFile[];
  }) => {
    if (list.length === 0) {
      onChange?.([]);
      setFileList([]);
      return;
    }
    // 格式话错误请求数据
    const _fileList = list.map((it: any) => {
      if (
        it.status === 'done' &&
        it.response &&
        !Boolean(it.response.success)
      ) {
        return {
          ...it,
          status: 'error',
          url: null,
          thumbUrl: null,
        };
      }
      return it;
    });

    const rfileList = _fileList.filter((item) => {
      if (item.status === 'done') {
        return true;
      } else {
        if (item.size && item.type) {
          return maxSizeCheck(item);
        }
        return true;
      }
    });

    const doneList = _fileList.filter((it) => it.status === 'done');
    // 全部请求完以后在加载
    if (doneList.length === _fileList.length) {
      const outList: any[] = [];
      for (let i = 0; i < _fileList.length; i++) {
        const file = _fileList[i];
        if (file.status === 'done') {
          let result: any = file;
          if (file.response && file.response.success) {
            result = file.response.data;
          }
          outList.push(result);
        }
      }
      setFileList(doneList.map((it, index) => fileFormatObjet(it, index)));
      const val = mode === 'single' ? outList[0] : outList;
      onChange?.(val);
    } else {
      setFileList(rfileList);
    }
  };

  const loadImg = (file: Blob) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onload = function () {
        // 当 FileReader 读取文件时候，读取的结果会放在 FileReader.result 属性中
        var imgObj = new Image();
        // @ts-ignore
        imgObj.src = reader.result;
        imgObj.onload = function () {
          resolve({ width: imgObj.width, height: imgObj.height });
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // 上传前校验
  const beforeUpload = async (file: any) => {
    if (file.type.indexOf('image') > -1) {
      const size: any = await loadImg(file);

      if (imgWidth || imgHeight) {
        if (imgHeight) {
          const { minHeight, maxHeight, height } = imgHeight;
          if (minHeight && maxHeight) {
            if (!(size.height < maxHeight && size.height > minHeight)) {
              message.error(`图片高度必须${minHeight}-${maxHeight}!`);
              return false;
            }
          } else if (minHeight) {
            if (size.height < minHeight) {
              message.error(`图片高度必须大于${minHeight}!`);
              return false;
            }
          } else if (maxHeight) {
            if (size.height > maxHeight) {
              message.error(`图片高度不超过${maxHeight}!`);
              return false;
            }
          } else if (height) {
            if (size.height != height) {
              message.error(`图片高度必须${height}!`);
              return false;
            }
          }
        }
        if (imgWidth) {
          const { minWidth, maxWidth, width } = imgWidth;
          if (maxWidth && minWidth) {
            if (!(size.height < maxWidth && size.height > minWidth)) {
              message.error(`图片宽度必须${minWidth}-${maxWidth}!`);
              return false;
            }
          } else if (minWidth) {
            if (size.width < minWidth) {
              message.error(`图片宽度必须大于${minWidth}!`);
              return false;
            }
          } else if (maxWidth) {
            if (size.width > maxWidth) {
              message.error(`图片宽度不超过${maxWidth}!`);
              return false;
            }
          } else if (width) {
            if (size.width != width) {
              message.error(`图片宽度必须${width}!`);
              return false;
            }
          }
        }
      }
      const isJpgOrPng = file.type && file.type.indexOf('image') > -1;
      const isLt2M = file.size <= maxSize;
      // 判断是否有url 如果有就立即上传，没有就不上传，而是改为手动提交
      if (!isJpgOrPng) {
        message.error('请上传JPG/PNG的图片格式');
        return false;
      }

      if (!isLt2M) {
        message.error(`图片大小必须小于${maxSizeM}M!`);
        return false;
      }
      if (uploadImmediately) {
        return isJpgOrPng && isLt2M;
      } else {
        return false;
      }
    }
    if (file.type.indexOf('video') > -1) {
      const isJpgOrPng = file.type && file.type.indexOf('video') > -1;
      const isLt2M = file.size <= videoMaxSize;
      // 判断是否有url 如果有就立即上传，没有就不上传，而是改为手动提交
      if (!isJpgOrPng) {
        message.error('请上传视频');
        return false;
      }
      if (!isLt2M) {
        message.error(`视频大小必须小于${videoMaxSizeM}M!`);
        return false;
      }
      if (uploadImmediately) {
        return isJpgOrPng;
      } else {
        return false;
      }
    }
    const isLt2M = file.size <= maxSize;

    if (!isLt2M) {
      message.error(`文件大小必须小于${maxSizeM}M!`);
      return false;
    }

    if (uploadImmediately) {
      return isLt2M;
    } else {
      return false;
    }
  };

  return (
    <div className="vd-upload">
      <ScUpload
        action={action}
        listType="picture-card"
        fileList={fileList}
        onChange={handleChange}
        accept={accept}
        beforeUpload={beforeUpload}
        headers={headers}
        {...restProps}
        maxCount={maxNum}
        multiple
      >
        {fileList.length >= maxNum ? null : (
          <div>
            <PlusOutlined />
            <div>上传</div>
          </div>
        )}
      </ScUpload>
    </div>
  );
};
VdUpload.valueType="VdUpload"
registerEditorAttrCmp(VdUpload)
export default VdUpload;
