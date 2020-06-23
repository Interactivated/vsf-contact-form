import { ActionTree } from 'vuex'
import RootState from '@vue-storefront/core/types/RootState'
import rootStore from '@vue-storefront/core/store'
import Vue from 'vue'
import Contact from '../types/Contact'
import i18n from '@vue-storefront/i18n'
import { processURLAddress } from '@vue-storefront/core/helpers'

// actions
const actions: ActionTree<any, RootState> = {
  /**
   * Send contact form
   *
   * @param context
   * @param {Review} messageData
   * @returns {Promise<void>}
   */
  async send (context, messageData: Contact) {
    Vue.prototype.$bus.$emit('notification-progress-start', i18n.t('Sending the message ...'))

    let url = processURLAddress(rootStore.state.config.contact.endpoint)

    try {
      await fetch(url, {
        method: 'POST',
        mode: 'cors',
        headers: {
          Accept: 'application/json, text/plain, */*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(messageData)
      })
      Vue.prototype.$bus.$emit('notification-progress-stop')
      rootStore.dispatch('notification/spawnNotification', {
        type: 'success',
        message: i18n.t('Your comment was sent!'),
        action1: { label: i18n.t('OK') }
      })
      Vue.prototype.$bus.$emit('clear-contact-form')
    } catch (e) {
      Vue.prototype.$bus.$emit('notification-progress-stop')
      rootStore.dispatch('notification/spawnNotification', {
        type: 'error',
        message: i18n.t('Something went wrong. Try again in a few seconds.'),
        action1: { label: i18n.t('OK') }
      })
    };
  }
}

export default actions
