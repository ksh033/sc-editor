import type { BaseSchemaEditor, ProFormColumnsType } from '@sceditor/editor-core';
//import React from 'react';
//import ParentSchemCmp from '../base/ParentSchemCmp';
import { SysValueTypes } from '../components/interface';

export type VdProFormColumnsType<RecordType = any> = ProFormColumnsType<
  RecordType,
  SysValueTypes
>;


export type ComponentSchemaProps = BaseSchemaEditor;

