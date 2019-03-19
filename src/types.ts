import {
  FieldProps,
  XFieldProps,
  XFieldMap,
  XFieldRefMap,
  formalizer,
} from '@formalizer/core'
import {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
} from 'react'

export type FormFieldInputProps = InputHTMLAttributes<HTMLInputElement> &
  TextareaHTMLAttributes<HTMLTextAreaElement> &
  SelectHTMLAttributes<HTMLSelectElement>

export interface FormFieldExtraProps {
  component: React.ReactNode
  inputProps?: FormFieldInputProps
  touched?: boolean
  dirty?: boolean
}

// FORM PROPS
export interface FormProps {
  render?: (props: FormChildProps) => React.ReactNode
  children?: ((props: FormChildProps) => React.ReactNode) | React.ReactNode
  fields?: FieldProps[]
  xFieldMap?: XFieldMap<FormFieldExtraProps>[]
}

// FORM CHILDREN RENDER/COMPONENT PROPS
export type FormChildProps<E = FormFieldExtraProps> = {
  formalizer: formalizer<E>
}

// FIELD PROPS
export type FormFieldProps<E = FormFieldExtraProps> = XFieldProps<E> & {
  xField: XFieldProps<E>
  xFieldRefMap: XFieldRefMap<E>
  render?: (props: FormFieldChildProps) => React.ReactNode
  children?: ((props: FormFieldChildProps) => React.ReactNode) | React.ReactNode
}

// FIELD STATE
export type FormFieldState<E = FormFieldExtraProps> = XFieldProps<E> &
  Pick<
    FormFieldProps,
    Exclude<
      keyof FormFieldProps,
      'render' | 'children' | 'xField' | 'xFieldRefMap'
    >
  >

// FIELD EVENT TYPES
export type FormFieldHandleChange = (e: React.ChangeEvent<any> | any) => void
export type FormFieldHandleBlur = (e: React.FocusEvent<any>) => void

// FIELD CHILDREN RENDER/COMPONENT PROPS
export type FormFieldChildProps<E = FormFieldExtraProps> = XFieldProps<E> & {
  xField: XFieldProps<E>
  xFieldRefMap: XFieldRefMap<E>
  handleChange?: FormFieldHandleChange
  handleBlur?: FormFieldHandleBlur
}

// FIELD GROUP CHILDREN RENDER/COMPONENT PROPS
export type FormFieldGroupChildProps<E = FormFieldExtraProps> = XFieldProps<
  E
> & {
  xField: XFieldProps<E>
  xFieldRefMap: XFieldRefMap<E>
}
