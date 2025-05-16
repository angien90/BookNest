<script setup>
import Header from '@/components/Header.vue';
import AdminPanelUsers from '@/components/AdminPanelUsers.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <main>
    <AdminPanelUsers />
    </main>
    
    <Footer />    
</template>

<style lang='scss' scoped>
main {
    min-height: 100vh;
    background-color: $creamwhite;
}
</style>