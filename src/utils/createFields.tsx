import { IXFieldRefMap, XFieldProps } from '@formalizer/core'
import React from 'react'
import { IFormFieldExtraProps } from '../types'
import { createField } from './createField'

export function createFields(
  xFields: Array<XFieldProps<IFormFieldExtraProps>>,
  xFieldRefMap: IXFieldRefMap<IFormFieldExtraProps>
) {
  // tslint:disable jsx-no-multiline-js
  return (
    <React.Fragment>
      {xFields
        .filter(f => f.extraProps && f.extraProps.component)
        .map(xField => createField(xField, xFieldRefMap))}
    </React.Fragment>
  )
}
