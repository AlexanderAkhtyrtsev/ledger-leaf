<template>
    <v-menu transition="scale-transition" offset-y :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-card class="my-2">
          <v-card-title class="d-flex align-center">
            <v-btn flat @click="nextMonth"><v-icon>mdi-arrow-left</v-icon></v-btn>

            <span v-bind="props" class="d-inline-flex align-center justify-center ga-2 mx-2">
              <span v-if="isFullMonth">{{ startDate.toFormat('LLLL yyyy') }}</span>
              <span v-else>{{  startDate.toFormat('dd LLL yyyy') }} - {{ endDate.toFormat('dd LLL yyyy') }}</span>
            </span>

            <v-btn flat
                   :hidden="endDate.month === DateTime.utc().month"
                   @click="prevMonth"
            ><v-icon>mdi-arrow-right</v-icon></v-btn>
          </v-card-title>
        </v-card>
      </template>
      <v-card  max-width="300">
        <v-card-text>
          <v-select v-model="selectedMonth" :items="months" label="Month" @update:modelValue="updateDate"></v-select>
          <v-select v-model="selectedYear" :items="years" label="Year" @update:modelValue="updateDate"></v-select>
        </v-card-text>
      </v-card>
    </v-menu>
</template>

<script setup>
import { computed, ref } from 'vue';
import { DateTime } from 'luxon';
import store from '@/store';

const startDate = computed(() => store.state.database.date.start);
const endDate = computed(() => store.state.database.date.end);

const isFullMonth = computed(() =>
    startDate.value.day === 1
    && (endDate.value.day === startDate.value.endOf('month').day
      || DateTime.utc().month === startDate.value.month && endDate.value.day === DateTime.utc().day
        )
);

const selectedYear = ref(startDate.value.year);
const selectedMonth = ref(startDate.value.month);

const years = Array.from({ length: 16 }, (_, i) => DateTime.now().year - i);

const months = computed(() => {
  const arr = [];
  let date = DateTime.fromObject({year: selectedYear.value , day: 1, month: 1});

  while ( date <= DateTime.now() ) {
    arr.push({ title: date.toFormat('LLLL'), value: date.month } )
    date = date.plus({month: 1});
  }

  return arr;
})

const nextMonth = () => {
  store.commit('database/shiftPeriod', 1)
}

const prevMonth = () => {
  store.commit('database/shiftPeriod', -1)
}

const updateDate = () => {
  store.state.database.date.start = DateTime.utc(selectedYear.value, selectedMonth.value, 1);
  store.state.database.date.end = store.state.database.date.start.endOf('month');
};
</script>