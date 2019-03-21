import { IXFieldRefMap, XFieldProps } from '@formalizer/core'
import React from 'react'
import { IFormFieldExtraProps } from '../types'
import { renderField } from './renderField'

export function renderFields(
  xFields: Array<XFieldProps<IFormFieldExtraProps>>,
  xFieldRefMap: IXFieldRefMap<IFormFieldExtraProps>
) {
  // tslint:disable jsx-no-multiline-js
  return (
    <React.Fragment>
      {xFields
        .filter(f => f.extraProps && f.extraProps.component)
        .map(xField => renderField(xField, xFieldRefMap))}
    </React.Fragment>
  )
}
