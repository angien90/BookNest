<script setup>
import { ref, onMounted, watch, toRefs } from 'vue';
import { useRoute } from "vue-router";

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
});

const API_URL = import.meta.env.VITE_API_URL;
const review = ref ([]);

const isLoaded = ref(false);
const fetchReviews = async() => {
    if (!props.bookId) {
    console.warn("Book ID är undefined. Inget API-anrop görs.");
    return;
  }
    try{
        const response = await fetch(`${API_URL}review?book=${props.bookId}`);
        const data = await response.json();
    console.log(data);
    review.value = data;
    isLoaded.value = true; 
    }
    catch (error) {
        console.error('Error fetching reviews:', error);
    }
};

onMounted(fetchReviews);
//    alert('Component mounted!');
watch(() => props.bookId, (newBookId, oldBookId) => {
  if (newBookId !== oldBookId) {
    fetchReviews();
  }
});
</script>

<template>
    <aside class="review" v-if="isLoaded">
        <article class="review__form">
            <h2>Recensioner</h2>
            <p>Vad tyckte du om boken? Lämna gärna en recension till nästa läsare. <br> 
                Men kom ihåg, inga spoilers!</p>
<!--
            <form @submit.prevent="submitReview">
                <p>Ditt namn</p>
                <textarea v-model="reviewText" placeholder="Skriv din recension här..." required></textarea>

                <p>Din recension</p>
                <textarea v-model="reviewText" placeholder="Skriv din recension här..." required></textarea>

                <p>Sätt ditt betyg mellan 1-5</p>
                <textarea v-model="reviewText" placeholder="Skriv din recension här..." required></textarea>
                <button type="submit">Skicka recension</button>
                <button type="submit">Avbryt</button>
            </form>
            -->
        </article>

        <article class="review__list">
            <h3>Vad tyckte andra om boken?</h3>

            <div>
                <ul>
                    <li v-for="reviews in review" :key="review._id">
                        <p>Recension av {{ reviews.name }}</p>
                        <p>Såhär tyckte {{ reviews.name }} om boken: <br>{{ reviews.content }}</p>
                        <p>{{ reviews.name }} gav boken {{ reviews.rating }} av 5 i betyg.</p>
                        <p>Recensionen gjordes {{ reviews.created_at }}</p>
                    </li>
                </ul>
            </div>
        </article>
    </aside>   
</template>

<style scoped lang="scss">
article {
    background-color: $green;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-top: 20px;
    width: 100%;
    max-width: 408px;
}
</style>


