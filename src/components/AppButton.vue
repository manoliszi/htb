<template>
  <v-btn
    :id="id"
    class="app-btn ma-1"
    :loading="loading"
    :disabled="disabled"
    :color="color"
    :variant="variant"
    :density="density"
    @click.stop.prevent="btnClick"
  >
    <slot>
      <span>
        {{ label }}
      </span>
    </slot>
  </v-btn>
</template>

<script setup>

const props = defineProps({
  id: { type: String, default: 'button' },
  label: { type: String, default: '' },
  color: { type: String, default: '' },
  loading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
  density: { type: String, default: 'default' },
  variant: { type: String, default: 'plain' }
});
const emit = defineEmits(['click']);

function btnClick(e) {
  emit('click', e);
}
</script>
