<template>
  <v-dialog v-model="dialog" :max-width="$vuetify.display.mdAndUp ? '500px' : null" :fullscreen="!$vuetify.display.mdAndUp">
    <v-card>
      <v-card-title class="d-flex justify-space-between align-center">
        <span>{{ account.id ? 'Edit Account' : 'Create Account'}}</span>
        <v-card-actions>
          <v-btn text color="red" @click="dialog = false">Cancel</v-btn>
          <v-btn text color="primary" :disabled="!formValid" @click="submit">Save</v-btn>
        </v-card-actions>
      </v-card-title>
      <v-card-text>
        <v-form v-model="formValid" @submit.prevent="submit">
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

          <v-card-actions v-if="account.id">
            <DeleteButton label="Archive Account"
                          confirm-label="Yes, Archive it"
                          @delete="archiveAccount" />
          </v-card-actions>
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
import DeleteButton from '@/views/components/unit/DeleteButton.vue';

const dialog = ref(false);

const accountDefaultValue = {
  name: '',
  currency: '',
  amount: 0,
  note: '',
  icon: 'mdi-wallet'
};

const account = ref( {... accountDefaultValue} );

const formValid = ref(false);
const currencies = ref(['USD', 'EUR', 'GBP', 'UAH']);

const requiredRule = value => !!String(value).length || 'This field is required';
const amountRule = v => !isNaN(v) || 'Amount must be a number';

const submit = async () => {
  try {
    await store.dispatch(
        account.value.id ? 'database/updateAccount' : 'database/createAccount',
        {
          ... account.value,
          userId: store.state.user.uid,
        });

    dialog.value = false;
    resetForm();
  } catch (error) {
    console.error('Error creating account:', error);
    store.commit('addError', error?.message || 'Unknown error');
  }
};


const archiveAccount = () => {
  store.dispatch('database/deleteAccount', account.value.id)
      .then(() => {
        dialog.value = false;
      })
      .catch( e => {
        store.commit('addError', e?.message || 'Unknown error')
      })
};

const resetForm = () => {
  account.value = {
    ... account.value,
    ... accountDefaultValue,
  };
};

const handlePlusBtnClick = () => {
  dialog.value = true;
};

onMounted(() => {
  const pullData = (accountData) => {
    dialog.value = true;

    for(const p in accountData) {
      account.value[p] = accountData[p];
    }
  };

  eventBus.on('create-account', pullData);
  eventBus.on('update-account', pullData);
  eventBus.on('plusBtnClicked', handlePlusBtnClick);
});

onBeforeUnmount(() => {
  eventBus.off('plusBtnClicked');
});
</script>
