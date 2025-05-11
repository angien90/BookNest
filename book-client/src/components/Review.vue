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

        Bild
        {{ props.image }}

        <article class="book">
            Tillfälligt: {{ props.bookId }} <br>

            <h2>BokTitel {{ props.title }}</h2>
            <p>
                Författare: {{ props.author }} <br>
                Utgivningsår: {{ props.published_year }} <br>
                Genre: {{ props.genres }} <br>
                Beskrivning: {{ props.description }} <br>
            </p>
        </article>

        <article class="review_form">
            <h2>Recensioner</h2>
            <p>Vad tyckte du om boken? <br>
                Lämna gärna en recension till nästa läsare. <br> 
                Men kom ihåg, inga spoilers!</p>

            <form @submit.prevent="createReview" class="review_form">
                <div v-if="error" class="error">{{ error }}</div>
                <div v-if="success" class="success">{{ success }}</div>
                
                <label for="name"><p>Ditt namn</p></label>
                <input type="text" id="name" v-model="name" 
                    placeholder="Ange ditt namn..." required/>

                <label for="content"><p>Din recension</p></label>
                <textarea id="content" v-model="content" 
                    placeholder="Skriv din recension här..." required></textarea>

                <label for="rating"><p>Sätt betyg (1-5)</p></label>
                <input type="number" id="rating" v-model="rating" 
                    min="1" max="5" placeholder="1-5"
                    required/>

                <div class="buttons">
                    <button type="submit">Skicka recension</button>
                    <button type="button" @click="clearForm">Avbryt</button>
                </div>
            </form>
        </article>

        <article class="review_list">
            <h3>Vad tyckte andra om (bokens titel) {{ props.bookId }}?</h3>

            <div v-for="reviews in review" :key="review._id">
                <div class="line"></div>
                
                <div class="review_by_user">
                    <div class="content">
                        <p>Så här tyckte {{ reviews.name }} om boken:<br>
                            {{ reviews.content }}</p>
                        <!--    <p>{{ reviews.name }} gav boken {{ reviews.rating }} av 5 i betyg. </p> -->
                    </div>

                    <div class="stars">
                        <div v-for="index in 5" :key="index" 
                            class="star":class="{'filled': index <= reviews.rating}">
                        </div>
                    </div>

                    <p>Recensionen gjordes {{ formatDate(reviews.created_at) }}</p>
                </div>

            </div>
        </article>
    </aside>   
</template>

<style scoped lang="scss">

.review {
    background-color: $creamwhite;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 408px;
    height: auto; 
    padding: 5px;

    article {
        background-color: $green;
        border-radius: 8px;
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2),
                    inset -4px -4px 8px rgba(0, 0, 0, 0.2);
        margin: 10px 0;
        width: 100%;
        max-width: 388px;
        padding: 20px;

        label {
            display: block;
            font-family: $p;
            font-weight: bold;
            font-size: 16px;
            margin: 10px 0 5px 0;
        }

        .review_by_user{
            display: flex;
            flex-direction: column;
            margin: 10px 0;

            .content{
                font-weight: bold;
            }
        }
    }

    .stars {
        display: flex;
        justify-content: flex-start;
        margin: 10px 0;

        .star {
            width: 20px;
            height: 20px;
            background-color: $creamwhite;
            margin-right: 5px;
            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
        }

        .star.filled {
            background-color: $warmorange;
        }
    }

    .line {
        width: 100%;
        height: 1px;
        background-color: $darkgreen;
        margin: 10px 0;
    }

    h2{
        display: flex;
        justify-content: center;
        font-family: $H1;
        color: $creamwhite;
        font-size: $mobile_font_size_H2;
    }

    h3{
        font-family: $H1;
        color: $creamwhite;
        font-size: $mobile_font_size_H3;
    }

    p{
        font-family: $p;
        color: $creamwhite;
        font-size: $mobile_font_size_p;
    }

    .buttons{
        display: flex;
        justify-content: space-around;
        width: 100%;
        gap: 10px;
        margin-top: 20px;
        padding: 0 10px;

        button{
            flex: 1;
            max-width: 150px;
            @include primary-button;
        }
    }
}
</style>


