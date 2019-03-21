import { IXFieldProps, IXFieldRefMap } from '@formalizer/core'
import React from 'react'
import { FormFieldProps, IFormFieldExtraProps } from '../types'

export function createField(
  xField: IXFieldProps<IFormFieldExtraProps>,
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
