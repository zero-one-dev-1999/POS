import { useSelector as reduxUseSelector, TypedUseSelectorHook } from 'react-redux'
import { RootState } from '../store'

export const useSelector: TypedUseSelectorHook<RootState> = reduxUseSelector
