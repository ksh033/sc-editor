import type { ProFormColumnsType } from '@sceditor/editor-core';

import { ComponentItemType } from './enum';


export type VdProFormColumnsType<RecordType = any> = ProFormColumnsType<
  RecordType,
  ComponentItemType
>;

