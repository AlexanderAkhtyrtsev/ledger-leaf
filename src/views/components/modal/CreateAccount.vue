<template>
  <v-dialog v-model="dialog" :max-width="$vuetify.display.mdAndUp ? '500px' : null" :fullscreen="!$vuetify.display.mdAndUp">
    <v-card>
      <v-card-title class="headline">Create Account</v-card-title>
      <v-card-text>
        <v-form v-model="formValid" @submit.prevent="createAccount">
          <v-text-field
              v-model="account.name"
              label="Account Name"
              :rules="[requiredRule]"
              required
          />
          <v-select
              v-model="account.currency"
              :items="currencies"
              label="Currency"
              :rules="[requiredRule]"
              required
          />
          <v-text-field
              v-model="account.amount"
              label="Initial Amount"
              type="number"
              :rules="[amountRule, requiredRule]"
              required
          />

          <icon-picker :hint="account.name" v-model="account.icon" :value="account.icon" />

          <v-text-field
              v-model="account.note"
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

<script setup>
import eventBus from '@/eventBus';
import IconPicker from '@/views/components/unit/IconPicker.vue';
import {onBeforeUnmount, onMounted, ref} from 'vue';
import store from '@/store';

const dialog = ref(false);

const account = ref({
  name: '',
  currency: '',
  amount: 0,
  note: '',
  icon: 'mdi-wallet'
});

const formValid = ref(false);
const currencies = ref(['USD', 'EUR', 'GBP', 'UAH']);

const requiredRule = value => String(value).length || 'This field is required';
const amountRule = v => !isNaN(v) || 'Amount must be a number';

const createAccount = async () => {
  try {
    await store.dispatch('database/createAccount', {
      ... account.value,
      userId: store.state.user.uid,
      createdAt: new Date(),
    });

    dialog.value = false;

    resetForm();
  } catch (error) {
    console.error('Error creating account:', error);
  }
};

const resetForm = () => {
  account.value = {
    name: '',
    currency: '',
    amount: 0,
    note: '',
    icon: 'mdi-wallet'
  };
};

const handlePlusBtnClick = () => {
  dialog.value = true;
};

onMounted(() => {
  eventBus.on('plusBtnClicked', handlePlusBtnClick);
});

onBeforeUnmount(() => {
  eventBus.off('plusBtnClicked');
});
</script>
