## Installation in theme
Add to dependencies in your **theme** package.json
`storefront/src/themes/your_theme/package.json`
```
"@interactivated/vsf-contact-form": "https://github.com/Interactivated/vsf-contact-form.git#1.0.4"
```

## Usage in theme
Add page or component to your theme, for example `storefront/src/themes/your_theme/pages/Contacts.vue`
```
<template>
  <div id="contacts" class="col-main">
    <ContactForm />
  </div>
</template>

<script>

import ContactForm from '@interactivated/vsf-contact-form/components/molecules/ContactForm';

export default {
  name: 'Contacts',
  components: {
    ContactForm
  }
}
</script>
```

## Change webpack to allow ts in modules
In `storefront/core/build/webpack.base.config.ts`
Remove `exclude: /node_modules/` and add option `allowTsInNodeModules: true`
```
{
    test: /\.ts$/,
    loader: ‘ts-loader’,
    options: {
     allowTsInNodeModules: true,
     appendTsSuffixTo: [/\.vue$/]
  }
}
```

## Include in tsconfig
In `storefront/tsconfig.json`
Remove `node_modules` from exclude section, add `"node_modules/@interactivated/**/*.ts"` to include section
```
"include": [
  ...
  "node_modules/@interactivated/**/*.ts"
 ],
 "exclude": [
  "**/*.spec.ts"
 ]
```

## Register the ContactForm module in vue storefront
Add module import to `storefront/src/modules/client.ts`
```
...
import { ContactForm } from '@interactivated/vsf-contact-form'


...
export function registerClientModules () {
  registerModule(ContactForm)
}
```
Run `yarn install` in theme dir -> `yarn dev`

## Contact Form  API extension
```
Install extension to vue-storefront-api:`

$ cp -fr node_modules/@interactivated/vsf-contact-form/api/contact-form ../vue-storefront-api/src/api/extensions/

or

$ cp -fr node_modules/@interactivated/vsf-contact-form/api/contact-form ../api/src/api/extensions/

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
