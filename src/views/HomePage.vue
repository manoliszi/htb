<template>
  <v-app>
    <v-snackbar
      v-model="snackbar"
      :color="'error'"
      :timeout="3000"
      density="compact"
    >
      <p style="margin-bottom: 0 !important;">
        {{ snackbarMessage }}
      </p>
    </v-snackbar>
    <user-profile />
    <v-card style="overflow: visible; z-index: 1">
      <v-card-title>Coindesk Data</v-card-title>
      <v-card-text>
        <v-container :class="{ 'd-flex': $vuetify.display.mdAndUp, 'd-block': $vuetify.display.smAndDown }" class="pb-0">
          <v-col :cols="$vuetify.display.smAndDown ? 12 : 5">
            <date-picker
              id="dateFrom"
              v-model="dateFrom"
              placeholder="from"
              :label="'Date From'"
            />
          </v-col>
          <v-col :cols="$vuetify.display.smAndDown ? 12 : 5">
            <date-picker
              id="dateTo"
              v-model="dateTo"
              placeholder="to"
              :disabled="true"
              :label="'Date To'"
            />
          </v-col>
          <v-col :cols="$vuetify.display.smAndDown ? 12 : 2">
            <app-button
              id="applyDates"
              :label="'Apply'"
              variant="elevated"
              color="primary"
              @click="getCoinHistory"
            />
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script setup>
import { useMainStore } from '../stores/index'
import {ref, computed} from 'vue';
import UserProfile from '@/components/UserProfile.vue';
import DatePicker from '@/components/DatePicker.vue';
import AppButton from "@/components/AppButton.vue";

const store = useMainStore()
const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);
const dateFrom = ref(yesterday.getTime())
const dateTo = ref(yesterday.getTime())
const snackbar = ref(false);
const snackbarMessage = ref('');

const chartData = computed(() => store.getChartData);

function calculateDateDifference(startDate, endDate) {
  if (isNaN(startDate) || isNaN(endDate)) {
    throw new Error("One or both of the dates are invalid.");
  }

  const timeDifference = endDate - startDate;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  return Math.abs(daysDifference) + 1;
}

async function getCoinHistory() {
  const startDate = new Date(dateFrom.value);
  const endDate = new Date(dateTo.value);
  if (endDate < startDate) {
    snackbar.value = true
    snackbarMessage.value = 'Make sure the date from is before date to and try again'
    return;
  }
  const numberOfDays = calculateDateDifference(startDate, endDate)
  const resp = await store.getBitcoinHistory(numberOfDays)
  if (!resp.ok) {
    snackbar.value = true
    snackbarMessage.value = 'There was an error while trying to fetch the bitcoin data. Please try again later'
  }
}
</script>
