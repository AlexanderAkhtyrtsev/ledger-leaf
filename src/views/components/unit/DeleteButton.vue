<template>
  <span v-if="confirm">Are you sure??</span>
  <v-btn color="red" class="ms-auto" @click="click">{{ !confirm ? props.label || 'Delete' : 'Yes, delete' }}</v-btn>
</template>

<script setup>
import {ref, watch} from 'vue';

const emit = defineEmits(['delete'])
const props = defineProps(['label'])
const confirm = ref(false);

watch(confirm, (val) => {
  if ( val )
    setTimeout(() => confirm.value = false, 3000)
})

const click = () => {
  if (confirm.value) {
    emit('delete')
    confirm.value = false
  }
  else confirm.value = true
}

</script>


<style scoped>

</style>