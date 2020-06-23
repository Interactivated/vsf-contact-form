import { contactForm } from './store'
import { StorefrontModule } from '@vue-storefront/core/lib/modules';

export const ContactForm: StorefrontModule = function ({store}) {
  store.registerModule('contactForm', contactForm)
}
