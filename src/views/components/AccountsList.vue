<template>
  <v-row v-if="accounts.length">
    <v-col v-for="account in accounts" :key="account.id">
      <v-card draggable="true" @drop="onDrop" @dragover.prevent>
        <v-card-title>{{ account.name }}</v-card-title>
        <v-card-subtitle>{{ formatCurrency(account.amount, account.currency) }}</v-card-subtitle>
        <v-card-text>
          <v-row>
            <v-col v-if="account.note">Note: {{ account.note }}</v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
              color="medium-emphasis"
              icon="mdi-plus"
              size="small"
          ></v-btn>

          <v-btn
              color="medium-emphasis"
              icon="mdi-transfer"
              size="small"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
  <div v-else >
    <v-alert type="info">No accounts found</v-alert>
  </div>
</template>

<script setup>
import {formatCurrency} from '@/helpers';
import {useStore} from 'vuex';
import {computed} from 'vue';
const store = useStore();
const accounts = computed( () => store.getters['database/accounts'] );

const onDrop = (event) => {
  console.log(event)
}

</script>

<style scoped>

</style>