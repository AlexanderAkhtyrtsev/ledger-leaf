<template>
  <div v-if="accounts.length"
       @dragover.prevent
       @dragend="dropped = true"
       @drop="dropped = true"
  >
    <v-row>
      <v-col cols="6" sm="6" md="4"
             class="pa-1"
             v-for="account in accounts"
             :key="account.id">
        <Account :account="account"
                 draggable="true"
                 @drop.stop="handleDrop($event, account)"
                 @dragover.prevent
                 @click="eventBus.emit('update-account', account)"
                 @dragstart="handleDragStart($event, account)"
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
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import Account from '@/views/components/unit/Account.vue';
import CreateTransfer from '@/views/components/modal/CreateTransfer.vue';
import eventBus from '@/eventBus';

const store = useStore();
const accounts = computed( () => store.getters['database/accounts'] );

const srcAccount = ref(null);
const targetAccount = ref(null);
const dropped = ref(false);

const handleDragStart = (event, data) => {
  event.dataTransfer.setData('text/plain', JSON.stringify({
    type: 'account',
    data
  }))

  dropped.value = false;
  srcAccount.value = data;
}

const handleDrop = (event, account) => {

  const {data, type} = JSON.parse( event.dataTransfer.getData('text/plain') )

  if ( type === 'account' ) {
    dropped.value = true;

    if (account.id === srcAccount.value?.id) {
      srcAccount.value = null;
      return;
    }

    targetAccount.value = account;
  }

  else if ( type === 'category' ) {
    eventBus.emit('create-transaction', {
      categoryId: data.id,
      accountId: account.id,
    })
  }
}

const preventDropOnTransaction = () => { srcAccount.value = null;}
onMounted(() => { eventBus.on('dropped-on-transaction', preventDropOnTransaction) });
onBeforeUnmount(() => { eventBus.off('dropped-on-transaction', preventDropOnTransaction) });
</script>