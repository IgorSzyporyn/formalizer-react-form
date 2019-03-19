import React from 'react'
import {
  FormFieldState,
  FormFieldProps,
  FormFieldExtraProps,
  FormFieldGroupChildProps,
} from './types'
import { XFieldListenerCallback } from '@formalizer/core'
import isFunction from 'lodash/isFunction'

type ExtraProps = FormFieldExtraProps
type Props = FormFieldProps
type State = FormFieldState

class FormalizerFieldGroup extends React.Component<Props, State> {
  static displayName = 'FormalizerFieldGroup'
  static defaultProps = {}

  constructor(props: FormFieldProps) {
    super(props)

    this.state = {
      ...props,
    }

    props.addListener && props.addListener(this.handleXFieldChange)
  }

  render() {
    const { props, state } = this
    const { render, children, xField, xFieldRefMap } = props

    const childProps: FormFieldGroupChildProps = {
      ...state,
      xField,
      xFieldRefMap,
    }

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
