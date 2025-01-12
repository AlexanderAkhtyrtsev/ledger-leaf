<template>
  <Welcome v-if="!auth.currentUser" />
  <div v-else>
    <v-row>
      <v-col cols="12">
        <AccountsList />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CategoriesList />
        <CreateTransaction />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import {auth} from '@/firebase/auth';
import AccountsList from '@/views/components/AccountsList.vue';
import CategoriesList from '@/views/components/CategoriesList.vue';
import {defineAsyncComponent} from 'vue';
import CreateTransaction from '@/views/components/modal/CreateTransaction.vue';

const Welcome = defineAsyncComponent( () => import( '@/views/components/Welcome.vue' ) );

</script>
