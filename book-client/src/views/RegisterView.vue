<script setup>
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
import RegisterForm from '@/components/RegisterForm.vue';
</script>

<template>
    <main>
        <Header />
        <RegisterForm />
        <Footer />
    </main>
</template>

<style lang='scss' scoped>
main {
    background-color: $creamwhite;
}
</style>
