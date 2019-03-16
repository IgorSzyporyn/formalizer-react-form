import createContext from 'create-react-context'
import { FormalizerContext } from './types'

export const {
  Provider: FormikProvider,
  Consumer: FormikConsumer,
} = createContext<FormalizerContext<any>>({} as any)
