import * as React from 'react'
import { formalizer } from '@formalizer/core'
import isFunction from 'lodash/isFunction'
import { renderFields } from './utils'
import { FormProps, FormFieldExtraProps, FormChildProps } from './types'

export class FormalizerForm extends React.Component<FormProps, {}> {
  static displayName = 'FormalizerForm'
  static defaultProps = {}

  public formalizr: formalizer<FormFieldExtraProps>

  constructor(props: FormProps) {
    super(props)

    this.formalizr = this.initFormalizer(props)
  }

  private initFormalizer = (props: FormProps) => {
    return new formalizer({
      fields: props.fields,
      xFieldMap: props.xFieldMap,
    })
  }

  render() {
    const { xFields, xFieldRefMap } = this.formalizr
    const { children, render } = this.props

    const formChildProps: FormChildProps = {
      formalizer: this.formalizr,
    }

    const a: any = window
    a.A = this.formalizr

    return (
      <form>
        <section>{renderFields(xFields, xFieldRefMap)}</section>
        <section>
          {render
            ? render(formChildProps)
            : children
            ? isFunction(children)
              ? (children as ((props: FormChildProps) => React.ReactNode))(
                  formChildProps as FormChildProps
                )
              : !(React.Children.count(children) === 0)
              ? React.Children.only(children)
              : null
            : null}
        </section>
      </form>
    )
  }
}
