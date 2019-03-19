import React from 'react'
import { XFieldProps, XFieldRefMap } from '@formalizer/core'
import { FormFieldExtraProps } from '../types'
import { renderField } from './renderField'

export function renderFields(
  xFields: XFieldProps<FormFieldExtraProps>[],
  xFieldRefMap: XFieldRefMap<FormFieldExtraProps>
) {
  return (
    <React.Fragment>
      {xFields
        .filter(f => f.extraProps && f.extraProps.component)
        .map(xField => renderField(xField, xFieldRefMap))}
    </React.Fragment>
  )
}
