import { Formalizer } from '@formalizer/core'
import { isFunction } from 'lodash'
import React from 'react'
import { IFormChildProps, IFormFieldExtraProps, IFormProps } from './types'
import { createFields } from './utils'

type Props = IFormProps<IFormFieldExtraProps>

export class FormalizerForm extends React.Component<Props, {}> {
  public static displayName = 'FormalizerForm'
  public static defaultProps = {}

  public formalizer: Formalizer<IFormFieldExtraProps>

  constructor(props: Props) {
    super(props)

    this.formalizer = this.initFormalizer(props)
  }

  public render() {
    const { xFields, xFieldRefMap } = this.formalizer
    const { children, render } = this.props

    const formChildProps: IFormChildProps = {
      formalizer: this.formalizer,
    }

    // tslint:disable jsx-no-multiline-js
    return (
      <form>
        <section>{createFields(xFields, xFieldRefMap)}</section>
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

  private initFormalizer = (props: Props) =>
    new Formalizer<IFormFieldExtraProps>({
      fields: props.fields,
      xFieldMap: props.xFieldMap,
    })
}
