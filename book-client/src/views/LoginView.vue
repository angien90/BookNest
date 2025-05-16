<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
    <main>
        <Header />
        <LoginForm />
    </main>
    
    <Footer />    
</template>

<style lang='scss' scoped>
main {
    min-height: 100vh;
    background-color: $creamwhite;
}
</style>