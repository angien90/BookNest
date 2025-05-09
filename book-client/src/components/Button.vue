<script setup>
import { computed } from "vue";
import { RouterLink } from "vue-router";

const props = defineProps({
  buttonText: String,
  to: String,
});

// Beräkna om vi ska använda <RouterLink> eller <button>
const isLink = computed(() => !!props.to);
</script>

<template>
  <component
    :is="isLink ? RouterLink : 'button'"
    :to="isLink ? to : null"
    class="button"
  >
    {{ buttonText }}
  </component>
</template>

<style lang="scss" scoped>
.button {
  @include button;
}
</style>