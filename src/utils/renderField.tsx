import React from 'react'
import { FormFieldExtraProps, FormFieldProps } from '../types'
import { XFieldProps, XFieldRefMap } from '@formalizer/core'

export function renderField(
  xField: XFieldProps<FormFieldExtraProps>,
  xFieldRefMap: XFieldRefMap<FormFieldExtraProps>
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
