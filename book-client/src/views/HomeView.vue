<script setup>
import StartPage from "../components/StartPage.vue";
import Footer from "../components/Footer.vue";
</script>

<template>
  
  <main>
    <StartPage />
    <Footer />
  </main>

</template>

<style lang="scss" scoped>
main {
  background-color: $creamwhite;
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}
</style>