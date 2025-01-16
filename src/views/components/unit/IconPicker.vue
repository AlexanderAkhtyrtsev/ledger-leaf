<template>
  <v-container class="my-2">
    <v-row style="height: 200px;overflow-y: scroll;">
      <v-col v-for="item in icons" class="ma-1 pa-0">
        <v-btn :color="icon === item ? 'success' : ''" @click="icon = item">
          <v-icon size="x-large">{{ item }}</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import {computed, onMounted} from 'vue';
import {categoryIcons} from '@/helpers/categories-icons';

const props = defineProps({
  hint: {
    type: String,
    default: '',
  },
  value: {
    type: String,
    default: '',
  }
});

const icon = defineModel();

onMounted(() => { icon.value = props.value})

const icons = computed(() => {
  if (props.hint) {
    return Object.entries(categoryIcons)
        .sort(([icon1, keywords], [icon2, keywords2]) => {
          return keywords.toLowerCase().includes(props.hint.toLowerCase())
                 && !keywords2.toLowerCase().includes(props.hint.toLowerCase())
                 ? -1
                 : 1
        })
        .map(([icon]) => icon)
  }
  return Object.keys(categoryIcons).sort( (icon1, icon2) => {
    return icon1 === props.value && icon2 !== props.value ? -1 : 1
  })
})
</script>

<style scoped>

</style>