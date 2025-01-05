<template>
  <v-dialog v-model="dialog" max-width="500px">
    <v-card>
      <v-card-title class="headline">Create Account</v-card-title>
      <v-card-text>
        <v-form v-model="formValid" @submit.prevent="createAccount">
          <v-text-field
              v-model="name"
              label="Account Name"
              :rules="[requiredRule]"
              required
          />
          <v-select
              v-model="currency"
              :items="currencies"
              label="Currency"
              :rules="[requiredRule]"
              required
          />
          <v-text-field
              v-model="amount"
              label="Amount"
              type="number"
              :rules="[amountRule, requiredRule]"
              required
          />
          <v-textarea
              v-model="note"
              label="Note"
              hint="Optional"
          />

          <v-btn :disabled="!formValid" color="primary" type="submit">
            Create Account
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import eventBus from '@/eventBus';

export default {
  data() {
    return {
      dialog: false,
      name: '',
      currency: '',
      amount: 0,
      note: '',
      formValid: false,
      currencies: ['USD', 'EUR', 'GBP', 'UAH'], // List of currencies
      requiredRule: value => String(value).length || 'This field is required',
      amountRule: v => !isNaN(v) || 'Amount must be a number',
    };
  },
  methods: {
    async createAccount() {
      try {
        this.$store.dispatch('database/createAccount', {
          name: this.name,
          currency: this.currency,
          amount: +this.amount,
          note: this.note,
          userId: this.$store.state.user.uid, // Link the account to the current user
          createdAt: new Date(),
        }).then(() => {
          this.dialog = false;
          this.resetForm();
        });

      } catch (error) {
        console.error('Error creating account:', error);
      }
    },
    resetForm() {
      this.name = '';
      this.currency = '';
      this.amount = 0;
      this.note = '';
    },
  },
  mounted() {
    eventBus.on('plusBtnClicked', () => {
      this.dialog = true;
    });
  },
  beforeUnmount() {
    eventBus.off('plusBtnClicked');
  },
}
</script>
