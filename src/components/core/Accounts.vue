<template>
  <v-container>
    <v-row v-if="accounts.length">
      <v-col v-for="account in accounts" :key="account.id" cols="12" md="4">
        <v-card>
          <v-card-title>{{ account.accountName }}</v-card-title>
          <v-card-subtitle>{{ account.currency }} - ${{ account.amount }}</v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col v-if="account.note">Note: {{ account.note }}</v-col>
              <v-col>
                <v-btn @click="viewAccount(account.id)" color="primary" small>View</v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <div v-else >
      <v-alert type="info">No accounts found</v-alert>
    </div>

    <CreateAccount />

  </v-container>
</template>


<script setup>
import {onMounted, computed} from 'vue';
import eventBus from '@/eventBus';
import {useStore} from 'vuex';
import CreateAccount from '@/components/core/modal/CreateAccount.vue';

const store = useStore();
const accounts = computed( () => store.state.database.accounts );

onMounted(async () => {
  await store.dispatch('database/fetchAccounts');
});


function viewAccount(accountId) {
  // Handle account view logic here
}
</script>
