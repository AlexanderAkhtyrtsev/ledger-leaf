<template>
  <Welcome v-if="!auth.currentUser" />
  <v-container v-else>
    <v-row>
      <v-col cols="12">
        <AccountsList />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <CategoriesList />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {auth} from '@/firebase/auth';
import AccountsList from '@/views/components/AccountsList.vue';
import CategoriesList from '@/views/components/CategoriesList.vue';

const Welcome = import( '@/views/components/Welcome.vue' );

</script>
