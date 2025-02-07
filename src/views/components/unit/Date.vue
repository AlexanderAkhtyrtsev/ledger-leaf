<script setup>
import {Timestamp} from 'firebase/firestore';
import {computed} from 'vue';
import {DateTime} from 'luxon';

const model = defineModel();

const formattedDate = computed(() => {
  return DateTime.fromJSDate(
      model.value instanceof Timestamp
      ? model.value.toDate()
      : model.value
  ).toFormat('MMMM dd, yyyy').replace( ', ' + (new Date()).getFullYear(), '' )
})
</script>

<template>
  {{ formattedDate }}
</template>

<style scoped>

</style>