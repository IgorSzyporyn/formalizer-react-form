import { XFieldListenerCallback } from '@formalizer/core'
import { isFunction } from 'lodash'
import React from 'react'
import {
  FormFieldChildProps,
  FormFieldHandleBlur,
  FormFieldHandleChange,
  FormFieldProps,
  FormFieldState,
  IFormFieldExtraProps,
} from './types'

type ExtraProps = IFormFieldExtraProps
type Props = FormFieldProps
type State = FormFieldState

class FormalizerField extends React.Component<Props, State> {
  public static displayName = 'FormalizerField'
  public static defaultProps = {}

  constructor(props: FormFieldProps) {
    super(props)

    this.state = {
      ...props,
    }

    if (props.addListener) {
      props.addListener(this.handleXFieldChange)
    }
  }

  public handleChange: FormFieldHandleChange = val => {
    const { xField, $id } = this.props

    if ($id) {
      xField.value = val.currentTarget ? val.currentTarget.value : val
    }
  }

  public handleBlur: FormFieldHandleBlur = () => {
    // console.log(e)
  }

  public render() {
    const { props, state, handleChange, handleBlur } = this
    const { render, children, xField, xFieldRefMap } = props

    const childProps: FormFieldChildProps = {
      ...state,
      handleChange,
      handleBlur,
      xField,
      xFieldRefMap,
    }

    if (childProps.extraProps.inputProps) {
      childProps.extraProps.inputProps = {
        ...childProps.extraProps.inputProps,
        name: state.$id,
        value: state.value !== undefined ? (state.value as string) : '',
        onChange: handleChange,
        onBlur: handleBlur,
      }
    }

    // tslint:disable jsx-no-multiline-js
    return (
      <React.Fragment>
        {render
          ? render(childProps)
          : children
          ? isFunction(children)
            ? (children as ((props: FormFieldChildProps) => React.ReactNode))(
                childProps as FormFieldChildProps
              )
            : !(React.Children.count(children) === 0)
            ? React.Children.only(children)
            : null
          : null}
      </React.Fragment>
    )
  }

  private handleXFieldChange: XFieldListenerCallback<ExtraProps> = field => {
    this.setState({
      ...this.state,
      [field.propName]: field.value,
    })
  }
}

export default FormalizerField
