<script setup>
import { watch, inject } from 'vue';

const menuOpen = inject('menuOpen', null);

watch(menuOpen, (isOpen) => {
  if (isOpen !== null) {
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }
});
</script>

<template>
  <div id="app"></div>
  <router-view />
</template>

<style scoped>
nav {
  display: flex;
  gap: 15px;
  font-size: 1rem;
}

h1 {
  color: #4caf50;
}

span {
  display: block;
}
</style>