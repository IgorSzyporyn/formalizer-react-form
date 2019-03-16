import React from 'react'
import {
  FormalizerFieldState,
  FormalizerFieldProps,
  FormXFieldExtraProps,
} from './types'
import { XFieldListenerCallback } from '@formalizer/core/dist/types'

type ExtraProps = FormXFieldExtraProps

type Props = FormalizerFieldProps<ExtraProps>

type State = FormalizerFieldState

class FormalizerField extends React.Component<Props, State> {
  static displayName = 'FormalizerField'
  static defaultProps = {}

  constructor(props: FormalizerFieldProps<ExtraProps>) {
    super(props)

    const { addListener, ...xField } = props

    this.state = {
      ...xField,
    }

    addListener && addListener(this.handleXFieldChange)
  }

  render() {
    return <div>{this.state.value}</div>
  }

  private handleXFieldChange: XFieldListenerCallback<ExtraProps> = field => {
    this.setState({
      ...this.state,
      [field.propName]: field.value,
    })
  }
}

export default FormalizerField
