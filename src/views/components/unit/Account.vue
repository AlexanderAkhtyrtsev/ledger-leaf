<template>
  <v-card>
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
    </v-card-actions>
  </v-card>
</template>

<script setup>
import {formatCurrency} from '@/helpers'

const {account} = defineProps(['account']);
</script>