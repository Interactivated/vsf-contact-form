## Installation in theme
go to you theme directory and run
```
yarn add https://github.com/Interactivated/vsf-contact-form
```

## Usage in theme

Open your theme  example `storefront/src/themes/your_theme/pages/Contacts.vue`

```
<template>
  <div id="contacts" class="col-main">
    <ContactForm />
  </div>
</template>

<script>

import ContactForm from '@vue-storefront/vsf-contact-form/components/molecules/ContactForm';

export default {
  name: 'Contacts',
  components: {,
    ContactForm
  }
}
</script>
```

## Registration the ContactForm module

Add script import to `./src/modules/client.ts`
```

...
import { ContactForm } from '@vue-storefront/vsf-contact-form'

export function registerClientModules () {
  registerModule(ContactForm)
}


yarn install -> yarn dev
```

## Contact Form  API extension
```
Install extension to vue-storefront-api:`

$ cp -fr node_modules/@vue-storefront/vsf-contact-form/api/contact-form ../vue-storefront-api/src/api/extensions/

or

$ cp -fr node_modules/@vue-storefront/vsf-contact-form/api/contact-form ../api/src/api/extensions/

Go to api config ./vue-storefront-api/config/default.json and register the Feedback Company Api extension:

"registeredExtensions": [
    ...
    "contact-form"
]

yarn install -> yarn dev
```

## Contact Form magento2  extension

Install backend module for magento2 from this repository
Api [https://github.com/Interactivated/magento2-contact-api](https://github.com/Interactivated/magento2-contact-api)


