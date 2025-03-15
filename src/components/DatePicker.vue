<template>
  <VueDatePicker
    :id="id"
    v-model="datetime"
    :placeholder="label"
    :is24="true"
    :format="'yyyy/MM/dd'"
    :enable-time-picker="false"
    :auto-position="true"
    :text-input="{format: 'yyyy/MM/dd'}"
    :select-text="'Select'"
    :cancel-text="'Cancel'"
    :clearable="clearable"
    :auto-apply="autoApply"
    :disabled="disabled"
    @update:model-value="onChange"
  >
    <template #dp-input="{ value, onInput }">
      <v-text-field
        :model-value="value"
        :label="label"
        variant="outlined"
        density="compact"
        :disabled="disabled"
        required
        hide-details
        @update:model-value="onInput"
      />
    </template>
  </VueDatePicker>
</template>

<script setup>
import {onBeforeMount, ref, watch} from 'vue';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const props = defineProps({
  modelValue: {type: [Number,String], default: ''},
  id: {type: String, required: true},
  label: {type: String, default: 'datetime'},
  clearable: {type: Boolean, default: true},
  autoApply: {type: Boolean, default: false},
  disabled: {type: Boolean, default: false}
});
const emit = defineEmits(['update:modelValue']);

const datetime = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  datetime.value = formatValue(newVal);
});

onBeforeMount(() => {
  datetime.value = formatValue();
});

function formatValue(value = props.modelValue) {
  if (!value || value <= 0) return '';

  if (typeof value === 'number') {
    return new Date(value).toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  return value;
}

function onChange(val) {
  if (typeof val !== 'number') {
    val = new Date(val).getTime();
  } else if (val == 0) {
    val = null;
  }
  emit('update:modelValue', val);
}
</script>
