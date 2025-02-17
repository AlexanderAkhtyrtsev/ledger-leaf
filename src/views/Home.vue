<template>
  <Welcome v-if="!store.state.database.user" />
  <div v-else>
    <v-row style="position: sticky; top: 70px; z-index: 5;">
      <v-col cols="12">
        <v-sheet class="pa-4 rounded-lg">
            <AccountsList />
        </v-sheet>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CategoriesList />
        <CreateTransaction />
        <CreateAccount />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import store from '@/store';
import AccountsList from '@/views/components/AccountsList.vue';
import CategoriesList from '@/views/components/CategoriesList.vue';
import {defineAsyncComponent} from 'vue';
import CreateTransaction from '@/views/components/modal/CreateTransaction.vue';
import CreateAccount from '@/views/components/modal/CreateAccount.vue';

const Welcome = defineAsyncComponent( () => import( '@/views/components/Welcome.vue' ) );

</script>
