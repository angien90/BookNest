<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import LoginForm from '@/components/LoginForm.vue';
</script>

<template>
    <main>
        <Header />
        <LoginForm />
        <Footer />        
    </main>
</template>

<style lang='scss' scoped>
main {
    background-color: $creamwhite;
}
</style>