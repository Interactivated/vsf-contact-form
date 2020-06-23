import { Module } from 'vuex'
import actions from './actions'
import RootState from '@vue-storefront/core/types/RootState'

export const contactForm: Module<any, RootState> = {
  namespaced: true,
  actions
}
