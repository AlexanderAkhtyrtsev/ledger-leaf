<script setup>
import {Timestamp} from 'firebase/firestore';
import {computed} from 'vue';
import {DateTime} from 'luxon';

const model = defineModel();

const formattedDate = computed(() => {
  const converted = model.value instanceof Timestamp
                    ? model.value.toDate()
                    : typeof model.value === 'string'
                      ? new Date(model.value)
                      : model.value

  return DateTime.fromJSDate(converted)
      .toFormat('MMMM dd, yyyy')
      .replace( ', ' + (new Date()).getFullYear(), '' )
})
</script>

<template>
  {{ formattedDate }}
</template>

<style scoped>

</style>