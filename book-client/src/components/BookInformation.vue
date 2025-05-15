<script setup>
import { useRoute } from 'vue-router';
import Review from './Review.vue';

const route = useRoute();
const bookId = route.params.bookId;

console.log("Book ID:", bookId);
</script>

<template>
 <Review v-if="bookId && bookId.length > 0" :bookId="bookId" />
</template>

<style scoped lang="scss">

</style>