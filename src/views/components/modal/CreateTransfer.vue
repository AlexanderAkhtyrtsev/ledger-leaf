<template>
  <v-dialog :model-value="dialog" max-width="400px" @afterLeave="emit('close')">
    <v-card>
      <v-card-title>Make a Transfer</v-card-title>
      <v-card-text>
        <v-text-field
            type="number"
            v-model="model.sourceAmount"
            :label="`From ${source.name}`"
            @input="() => { model.targetAmount = store.getters.convertAmounts(source.currency, target.currency,  model.sourceAmount) }"
            autofocus
        >
          <template v-slot:append-inner>{{ source.currency }}</template>
        </v-text-field>
        <v-text-field
            v-if="target"
            type="number"
            v-model="model.targetAmount"
            :label="`To ${target.name}`"
            ref="input"
        >
          <template v-slot:append-inner>{{ target.currency }}</template>
        </v-text-field>
        <v-text-field
            v-model="model.note"
            label="Note"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="transfer" :disabled="!model.sourceAmount || (!model.targetAmount && !!target)">Transfer</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import {ref} from 'vue';
import store from '@/store';

const {source, target} = defineProps({
  source: {
    type: Object,
    required: true,
  },
  target: {
    type: Object,
  },
});
const emit = defineEmits(['close']);

const dialog = ref(true)
const input = ref();

const model = ref({
  sourceAmount: '',
  targetAmount: '',
  note: '',
})

const transfer = () => {
  store.dispatch('database/createTransfer', {
    source: {
      amount: Math.abs(model.value.sourceAmount) * -1,
      accountId: source.id,
      note: model.value.note
    },
    target: target ? {
      amount: Math.abs(model.value.targetAmount),
      accountId: target.id,
      note: model.value.note
    } : null,
  })
      .then(() => {
        dialog.value = false;
      })
}
</script>