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

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Get reviews by bookId from API
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

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("sv-SE", {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

onMounted(fetchReviews);
watch(() => props.bookId, (newBookId, oldBookId) => {
  if (newBookId !== oldBookId) {
    fetchReviews();
  }
});
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Create a review for a book
const name = ref("");
const content = ref("");
const rating = ref("");
const success = ref(null);
const error = ref(null);

const createReview = async () => {
    success.value = null;
    error.value = null;

    if (!props.bookId) {
        error.value = "Bok-ID saknas. En recension kan bara skapas på en befintlig book.";
        return;
    }

    try {
        const response = await fetch(`${API_URL}review`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },

            body: JSON.stringify({
                name: name.value,
                content: content.value,
                rating: parseInt(rating.value),
                book_id: props.bookId,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            error.value = data.message || "Något gick fel vid skickning av recension.";
            return;
        }

        success.value = "Recensionen har skickats!";
        clearForm();
    } 
    
    catch (error) {
        error.value = "Kunde inte skicka recension. Försök igen senare.";
        console.error("Error:", error);
    }
};

const clearForm = () => {
    name.value = "";
    content.value = "";
    rating.value = "";
    error.value = null;
    success.value = null;
};
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
</script>

<template>
    <aside class="review" v-if="isLoaded">
        <article class="review__form">
            <h2>Recensioner</h2>
            <p>Vad tyckte du om boken? Lämna gärna en recension till nästa läsare. <br> 
                Men kom ihåg, inga spoilers!</p>

            <form @submit.prevent="createReview" class="review_form">
                <div v-if="error" class="error">{{ error }}</div>
                <div v-if="success" class="success">{{ success }}</div>
                
                <label for="name">Ditt namn</label>
                <input type="text" id="name" v-model="name" 
                    placeholder="Ange ditt namn..." required/>

                <label for="content">Din recension</label>
                <textarea id="content" v-model="content" 
                    placeholder="Skriv din recension här..." required></textarea>

                <label for="rating">Sätt betyg (1-5)</label>
                <input type="number" id="rating" v-model="rating" 
                    min="1" max="5" placeholder="1-5"
                    required/>

                <div class="buttons">
                    <button type="submit">Skicka recension</button>
                    <button type="button" @click="clearForm">Avbryt</button>
                </div>
            </form>
        </article>

        <article class="review__list">
            <h3>Vad tyckte andra om (bokens titel) {{ props.bookId }}?</h3>

            <div v-for="reviews in review" :key="review._id">
                <div class="line"></div>
                <p>Så här tyckte {{ reviews.name }} om boken:<br>
                    {{ reviews.content }}</p>
                <!--    <p>{{ reviews.name }} gav boken {{ reviews.rating }} av 5 i betyg. </p> -->
                
                <div class="stars">
                    <div v-for="index in 5" :key="index" 
                        class="star":class="{'filled': index <= reviews.rating}">
                    </div>
                </div>

                <p>Recensionen gjordes {{ formatDate(reviews.created_at) }}</p>
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

.stars {
  display: flex;
  justify-content: flex-start;

    .star {
        width: 20px;
        height: 20px;
        background-color: #FFF7E3;
        margin-right: 5px;
        clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
    }

    .star.filled {
        background-color: #F08D2E;
    }
}

.line {
    width: 100%;
    height: 1px;
    background-color: #000;
    margin: 10px 0;
}
</style>


