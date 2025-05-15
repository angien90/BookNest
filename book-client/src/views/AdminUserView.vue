<script setup>
import Header from '@/components/Header.vue';
import AdminPanelUsers from '@/components/AdminPanelUsers.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <main>
    <Header />
    <AdminPanelUsers />
    <Footer />
  </main>
</template>

<style lang="scss" scoped>
main {
  background-color: $creamwhite;
}
</style>
