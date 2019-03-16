import * as React from 'react'
import { formalizer, XFieldProps } from '@formalizer/core'
import isFunction from 'lodash/isFunction'

import {
  FormalizerProps,
  FormalizerFormProps,
  FormalizerFormState,
  FormXFieldExtraProps,
} from './types'

import FormalizerField from './FormalizerField'
import { XFieldsRefMap } from '@formalizer/core/dist/types'

type ExtraProps = FormXFieldExtraProps

export class FormalizerForm extends React.Component<
  FormalizerFormProps<ExtraProps>,
  FormalizerFormState
> {
  static displayName = 'FormalizerForm'
  static defaultProps = {}

  public formalizr: formalizer

  public xComponentMap: { [key: string]: React.ReactNode } = {
    text: FormalizerField,
    number: FormalizerField,
  }

  constructor(props: FormalizerFormProps<ExtraProps>) {
    super(props)

    this.formalizr = this.initFormalizer(props)
  }

  private initFormalizer = (props: FormalizerFormProps<ExtraProps>) => {
    const { registerExtraProps } = this

    return new formalizer<ExtraProps>({
      fields: props.fields,
      xFieldMap: props.xFieldMap,
      registerExtraProps,
    })
  }

  private registerExtraProps = (xField: XFieldProps<ExtraProps>) => {
    const extraProps: ExtraProps = {}

    extraProps.component = FormalizerField

    return extraProps
  }

  render() {
    const { renderFields } = this
    const { fields, xFields, xFieldsRefMap } = this.formalizr
    const { children, render } = this.props

    const formalizerProps: FormalizerProps<ExtraProps> = {
      fields,
      xFields,
      formalizer: this.formalizr,
    }

    return (
      <div>
        <form>
          <section>{renderFields(xFields, xFieldsRefMap)}</section>
          <section>
            {render
              ? render(formalizerProps)
              : children
              ? isFunction(children)
                ? (children as ((
                    props: FormalizerProps<ExtraProps>
                  ) => React.ReactNode))(formalizerProps as FormalizerProps<
                    ExtraProps
                  >)
                : !(React.Children.count(children) === 0)
                ? React.Children.only(children)
                : null
              : null}
          </section>
        </form>
      </div>
    )
  }

  private renderFields = (
    xFields: XFieldProps<ExtraProps>[],
    xFieldsRefMap: XFieldsRefMap<ExtraProps>
  ) => {
    return (
      <React.Fragment>
        {xFields
          .filter(f => f.extraProps && f.extraProps.component)
          .map(xField => {
            const { extraProps } = xField
            const component = extraProps!.component!

            const componentProps: XFieldProps<ExtraProps> & { key: string } = {
              ...xField,
              extraProps: {
                ...extraProps,
                xFieldsRefMap,
              },
              key: `${xField.$id}`,
            }

            return React.createElement(component as any, componentProps)
          })}
      </React.Fragment>
    )
  }
}
