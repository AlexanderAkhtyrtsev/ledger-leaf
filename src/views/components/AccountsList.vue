<template>
  <div v-if="accounts.length"
       :class="{ 'bg-grey-darken-3': !!srcAccount }"
       @dragover.prevent
       @drop="dropped = true"
  >
    <v-row class="py-10">
      <v-col v-for="account in accounts" :key="account.id">
        <Account :account="account"
                 draggable="true"
                 @drop.stop="handleDrop(account)"
                 @dragover.prevent
                 @dragstart="srcAccount = account"
        />
      </v-col>
    </v-row>
    <CreateTransfer v-if="srcAccount && dropped"
                    :source="srcAccount"
                    :target="targetAccount"
                    @close="srcAccount = targetAccount = null;dropped = false"
    />
  </div>
  <div v-else >
    <v-alert type="info">No accounts found</v-alert>
  </div>
</template>

<script setup>
import {useStore} from 'vuex';
import {computed, ref} from 'vue';
import Account from '@/views/components/unit/Account.vue';
import CreateTransfer from '@/views/components/modal/CreateTransfer.vue';

const store = useStore();
const accounts = computed( () => store.getters['database/accounts'] );

const srcAccount = ref(null);
const targetAccount = ref(null);
const dropped = ref(false);

const handleDrop = (account) => {
  dropped.value = true;

  if ( account.id === srcAccount.value?.id ) {
    srcAccount.value = null;
    return;
  }

  targetAccount.value = account;
}
</script>