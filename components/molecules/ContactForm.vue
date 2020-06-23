<template>
  <div class="contacts-content-form">
    <form class="contact-form" @submit.prevent="sendForm" novalidate>
      <SfInput
        v-model.trim="messageData.name"
        name="name"
        :label="$t('Your Name')"
        :required="true"
        :valid="!$v.messageData.name.$error"
        :error-message="$t('Field is required')"
        @blur="$v.messageData.name.$touch()"
      />
      <SfInput
        v-model.trim="messageData.email"
        name="email"
        type="email"
        :label="$t('Your E-mail Address')"
        :required="true"
        :valid="!$v.messageData.email.$error"
        :error-message="
          !$v.messageData.email.required
            ? $t('Field is required.')
            : $t('Please provide valid e-mail address.')"
        @blur="$v.messageData.email.$touch()"
      />
      <SfInput
        v-model.trim="messageData.telephone"
        name="telephone"
        :label="$t('Your Phone')"
        :required="true"
        :valid="!$v.messageData.telephone.$error"
        :error-message="$t('Field is required')"
        @blur="$v.messageData.telephone.$touch()"
      />
      <textarea
        class="sf-input"
        v-model="messageData.comment"
        :placeholder="$t('Your Message')"
      />
      <SfButton
        class="color-secondary sf-button--full-width"
      >
        {{ $t('Submit') }}
      </SfButton>
    </form>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { SfInput, SfButton } from '@storefront-ui/vue';

export default {
  name: 'Contacts',
  components: {
    SfInput,
    SfButton
  },
  data () {
    return {
      messageData: {
        name: '',
        email: '',
        telephone: '',
        comment: ''
      }
    }
  },
  validations: {
    messageData: {
      email: {
        required,
        email
      },
      name: {
        minLength: minLength(2),
        required
      },
      telephone: {
        minLength: minLength(2),
        required
      },
      comment: {
        minLength: minLength(2),
        required
      }
    }
  },
  methods: {
    clearContactForm () {
      this.messageData = {
        name: '',
        email: '',
        telephone: '',
        comment: ''
      }
      this.$v.$reset()
    },
    callSubmit () {
      this.$store.dispatch('contactForm/send', this.messageData)
    },
    sendForm () {
      if (this.$v.$invalid) {
        this.$v.$touch()
        this.$store.dispatch('notification/spawnNotification', {
          type: 'error',
          message: this.$t('Please fix the validation errors'),
          action1: { label: this.$t('OK') }
        })
        return
      }
      this.callSubmit()
    }
  },
  mounted () {
    this.$bus.$on('clear-contact-form', this.clearContactForm)
  },
  destroyed () {
    this.$bus.$off('clear-contact-form', this.clearContactForm)
  }
}
</script>

<style lang="scss" scoped>
  .sf-input{
    ::v-deep input {
      background: var(--aloe-contact-form-background);
      padding: 10px 15px;
      height: 60px;
    }
    ::v-deep .sf-input__label {
      font-size: 24px;
      color: var(--aloe-product-title);
      padding-left: 1rem;
      font-weight: 500;
    }
    ::v-deep .form-control.form-control-text{
      height: 80px;
    }
  }
  textarea {
    height: 80px;
    background: var(--aloe-contact-form-background);
    padding: 10px 15px;
    width: 100%;
    font-size: 24px;
    border: none;
    color: var(--aloe-product-title);
    font-family: Arial;
  }
  .button-outline {
    background: var(--c-secondary);
    color: var(--c-body);
    border: 0;
    font-size: 24px;
    margin: 20px auto 0;
    display: block;
    width: 50%;
  }
</style>
