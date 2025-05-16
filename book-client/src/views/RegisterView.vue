<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
    <main>
        <Header />
        <RegisterForm />
    </main>
    
    <Footer />    
</template>

<style lang='scss' scoped>
main {
    min-height: 100vh;
    background-color: $creamwhite;
}
</style>
