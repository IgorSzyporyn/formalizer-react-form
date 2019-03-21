import { IXFieldRefMap, XFieldProps } from '@formalizer/core'
import React from 'react'
import { FormFieldProps, IFormFieldExtraProps } from '../types'

export function renderField(
  xField: XFieldProps<IFormFieldExtraProps>,
  xFieldRefMap: IXFieldRefMap<IFormFieldExtraProps>
) {
  const { component } = xField.extraProps

  const props: FormFieldProps & {
    key: string
  } = {
    ...xField,
    xFieldRefMap,
    xField,
    key: `${xField.$id}`,
  }

  return React.createElement(component as any, props)
}
