import {
  FieldProps,
  XFieldProps,
  XFieldMap,
  formalizer,
} from '@formalizer/core'
import { SafeXFieldProps, XFieldsRefMap } from '@formalizer/core/dist/types'

export interface FormalizerFormState {}

export interface FormalizerFormProps<ExtraProps> {
  render?: (props: FormalizerProps<ExtraProps>) => React.ReactNode
  children?:
    | ((props: FormalizerProps<ExtraProps>) => React.ReactNode)
    | React.ReactNode
  fields?: FieldProps[]
  xFieldMap?: XFieldMap
}

export type FormalizerFieldProps<ExtraProps> = XFieldProps<ExtraProps>

export type FormalizerFieldState = SafeXFieldProps

export interface FormXFieldExtraProps {
  component?: React.ReactNode
  xFieldsRefMap?: XFieldsRefMap
}

export interface FormalizerProps<ExtraProps> {
  fields: FieldProps[]
  xFields: XFieldProps<ExtraProps>[]
  formalizer: formalizer
}
