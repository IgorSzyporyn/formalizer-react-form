import { Formalizer } from '@formalizer/core'
import { isFunction } from 'lodash'
import React from 'react'
import { IFormChildProps, IFormFieldExtraProps, IFormProps } from './types'
import { renderFields } from './utils'

export class FormalizerForm extends React.Component<IFormProps, {}> {
  public formalizr: Formalizer<IFormFieldExtraProps>

  constructor(props: IFormProps) {
    super(props)

    this.formalizr = this.initFormalizer(props)
  }

  public render() {
    const { xFields, xFieldRefMap } = this.formalizr
    const { children, render } = this.props

    const formChildProps: IFormChildProps = {
      formalizer: this.formalizr,
    }

    const a: any = window
    a.A = this.formalizr

    // tslint:disable jsx-no-multiline-js
    return (
      <form>
        <section>{renderFields(xFields, xFieldRefMap)}</section>
        <section>
          {render
            ? render(formChildProps)
            : children
            ? isFunction(children)
              ? (children as ((props: IFormChildProps) => React.ReactNode))(
                  formChildProps as IFormChildProps
                )
              : !(React.Children.count(children) === 0)
              ? React.Children.only(children)
              : null
            : null}
        </section>
      </form>
    )
  }

  private initFormalizer = (props: IFormProps) => {
    return new Formalizer({
      fields: props.fields,
      xFieldMap: props.xFieldMap,
    })
  }
}
