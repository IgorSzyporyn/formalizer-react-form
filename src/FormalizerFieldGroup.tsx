import { XFieldListenerCallback } from '@formalizer/core'
import { isFunction } from 'lodash'
import React from 'react'
import {
  FormFieldGroupChildProps,
  FormFieldProps,
  FormFieldState,
  IFormFieldExtraProps,
} from './types'

type ExtraProps = IFormFieldExtraProps
type Props = FormFieldProps
type State = FormFieldState

class FormalizerFieldGroup extends React.Component<Props, State> {
  public static displayName = 'FormalizerFieldGroup'
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

  public render() {
    const { props, state } = this
    const { render, children, xField, xFieldRefMap } = props

    const childProps: FormFieldGroupChildProps = {
      ...state,
      xField,
      xFieldRefMap,
    }

    // tslint:disable jsx-no-multiline-js
    return (
      <React.Fragment>
        {render
          ? render(childProps)
          : children
          ? isFunction(children)
            ? (children as ((
                props: FormFieldGroupChildProps
              ) => React.ReactNode))(childProps as FormFieldGroupChildProps)
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

export default FormalizerFieldGroup
