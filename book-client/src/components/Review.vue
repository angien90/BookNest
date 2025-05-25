<script setup>
import Header from './Header.vue';
import { ref, onMounted, watch, toRefs, computed } from 'vue';
import { useRoute } from "vue-router";
import { defineProps, defineEmits } from 'vue';
import { watchEffect } from 'vue';

const props = defineProps({
  bookId: {
    type: String,
    required: true,
  },
});

const API_URL = import.meta.env.VITE_API_URL;
const review = ref ([]);
const isLoaded = ref(false);
const updateReviewId = ref(null);
const updateMode = ref(false);
const updateName = ref("");
const updateContent = ref("");
const updateRating = ref("");
const deleteModalVisible = ref(false);
const reviewToDelete = ref(null);

const book = ref({});

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Get books
const fetchBook = async () => {
  if (!props.bookId) {
    console.warn("Book ID är undefined. Inget API-anrop görs.");
    return;
  }

  try {
    const response = await fetch(`${API_URL}books/${props.bookId}`);
    const data = await response.json();
    console.log("hämtar ", data)
    book.value = data;
  } catch (error) {
    console.error("Error fetching book:", error);
  }
};

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
        console.log("Received bookId prop:", props.bookId);
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

const isLoggedIn = ref(false);
onMounted(() => {
    fetchReviews();
    fetchBook();
});

watchEffect(() => {
    isLoggedIn.value = !!localStorage.getItem('isLoggedIn');
    console.log(localStorage.getItem('isLoggedIn'))
});

watch(() => props.bookId, (newBookId, oldBookId) => {
    if (newBookId !== oldBookId) {
        fetchReviews();
        fetchBook();
    }
});

const formattedDescription = computed(() => {
    if (!book.value.description) return 'Beskrivning saknas';
  const paragraphs = book.value.description
    .split('\n')
    .filter(p => p.trim() !== '')  // Ta bort tomma rader
    .map(p => `<p>${p.trim()}</p>`); // Lägg varje rad i <p> taggar

  return paragraphs.join('');
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
        window.location.reload();
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

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Update a review by bookId
const startUpdate = (review) => {
    updateMode.value = true;
    updateReviewId.value = review._id;
    updateName.value = review.name;
    updateContent.value = review.content;
    updateRating.value = review.rating;
};

const cancelUpdate = () => {
    updateMode.value = false;
    updateReviewId.value = null;
    updateName.value = "";
    updateContent.value = "";
    updateRating.value = "";
};

const updateReview = async () => {
    try {
        const response = await fetch(`${API_URL}review/${updateReviewId.value}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            
            credentials: "include",
            body: JSON.stringify({
                name: updateName.value,
                content: updateContent.value,
                rating: parseInt(updateRating.value)
            })
        });

        if (response.ok) {
            const updatedReview = await response.json();
            const index = review.value.findIndex(r => r._id === updateReviewId.value);
            
            if (index !== -1) {
                review.value[index] = updatedReview;
            }
            cancelUpdate();
        }
    } 
    
    catch (error) {
        console.error("Error updating review:", error);
    }
};
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Check if the user is logged in
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
//Delete a review by bookId
const deleteReview = (reviewId) => {
  reviewToDelete.value = reviewId;
  deleteModalVisible.value = true;
};

const confirmDelete = async () => {
    try {
        const response = await fetch(`${API_URL}review/${reviewToDelete.value}`, {
            method: "DELETE",
            credentials: 'include'
        });
    
        //Deletes review
        if (response.ok) {
            review.value = review.value.filter(r => r._id !== reviewToDelete.value);
            deleteModalVisible.value = false;
        }
        
        else {
            console.error("Failed to delete the review.", error);
        }
    } 
    
    catch (error) {
        console.error("Error deleting review:", error);
    }
};

const cancelDelete = () => {
  deleteModalVisible.value = false;
};
/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
</script>

<template>
    <div class="custom_header">
        <Header>
            <template #logo>
                <img 
                :src="'/BookNest/public/images/' + book.image" 
                :alt="book.title"
                class="book_image"
                />
            </template>
            <template #extra>
                <RouterLink to="/" class="back-link">Tillbaka</RouterLink>
            </template>
        </Header>
    </div>

    <aside class="review" v-if="isLoaded">
        <article class="review_container book" aria-label="Gå tillbaka till startsidan">    
            <RouterLink to="/"> <span class="material-symbols-outlined" id="arrow_back">arrow_back</span>
            </RouterLink>
            <div class="review_book">
                <h2>{{ book.title }}</h2>
                <p>
                    <span class="text_marker">Författare: </span>{{ book.author }}
                </p>
                <p>
                    <span class="text_marker">Utgivningsår:</span> {{ book.published_year }}
                </p>
                <p v-if="book.genres">
                    <span class="text_marker">Genre: </span> {{ book.genres ? book.genres.join(', ') : 'Ingen genre tillgänglig' }}
                </p>
                <p>
                    <span class="text_marker">Beskrivning: </span><div v-html="formattedDescription"></div>
                </p>
            </div>
        </article>

<!--*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*-->

        <article class="review_list">
            <h3>Vad tyckte andra om "{{ book.title }}"?</h3>  

            <div class="review_by_user" v-if="review.length === 0">
                <div class="user_review">
                    <div class="content">
                        <p>Det finns inga recensioner än</p>
                    </div>
                </div>
            </div>
                
            <div class="review_by_user" v-for="reviews in review" :key="reviews._id">
                <div class="line"></div>

                <div class="user_review">
                    <div class="content">
                        <p>
                            <span class="text_marker">Så här tyckte {{ reviews.name }} om "{{ book.title }}"</span>
                        </p>
                        <p>{{ reviews.content }}</p>

                        <div class="stars">
                            <div v-for="index in 5" :key="index" 
                                class="star" :class="{ filled: index <= reviews.rating }">
                            </div>
                        </div>
                        
                        <p>Recensionen gjordes {{ formatDate(reviews.created_at) }}</p>
                    </div>
                        <div class="buttons" v-if="!(updateMode && updateReviewId === reviews._id)">
                            <button @click="startUpdate(reviews)" :aria-label="'Uppdatera recension från ' + reviews.name">Uppdatera</button>
                            <button @click="deleteReview(reviews._id)" :aria-label="'Ta bort recension från ' + reviews.name">Ta bort</button>
                        </div>
                </div>

                <div class="user_uppdate">
                    <div class="uppdate_user_review"v-if="updateMode && updateReviewId === reviews._id">
                    
                        <div class="uppdate">
                            <input type="text" v-model="updateName" placeholder="Ditt namn" />
                            <textarea v-model="updateContent" placeholder="Din recension"></textarea>
                            <input type="number" v-model="updateRating" min="1" max="5" placeholder="Betyg" />
                        </div>

                        <div class="buttons">
                            <button @click="updateReview" aria-label="Spara uppdaterad recension">Spara</button>
                            <button @click="cancelUpdate" aria-label="Avbryt uppdatering av recension">Avbryt</button>
                        </div>                
                    </div>
                </div>
            </div>
        </article>

<!--*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*-->

        <article class="review_form">
            <h2>Vad tyckte du om "{{ book.title }}"?</h2>


            <div class="new_review">
                <p>Kanske höll du med någon annan läsare. Kanske har du en helt annan åsikt. <br>
                Lämna gärna en recension till nästa läsare. <br> 
                Men kom ihåg, inga spoilers!</p>

                <form class="form" @submit.prevent="createReview">
                    <div v-if="error" class="error">{{ error }}</div>
                    <div v-if="success" class="success">{{ success }}</div>
                    
                    <label for="name"><span class="text_marker">Ditt namn</span></label>
                    <input type="text" id="name" v-model="name" 
                        placeholder="Ange ditt namn..." required/>

                    <label for="content"><span class="text_marker">Din recension</span></label>
                    <textarea id="content" v-model="content" 
                        placeholder="Skriv din recension här..." required></textarea>

                    <label for="rating"><span class="text_marker">Sätt betyg (1-5)</span></label>
                    <input type="number" id="rating" v-model="rating" 
                        min="1" max="5" placeholder="1-5"
                        required/>


                    <div class="buttons">
                        <button type="submit" aria-label="Skicka recension">Skicka recension</button>
                        <button type="button" @click="clearForm" aria-label="Avbryt uppdatering av recension">Avbryt</button>
                    </div>                  
                </form>      
            </div>
        </article>
    </aside>  

    <div v-if="deleteModalVisible" class="modal-overlay">
        <div class="modal">
            <span class="text_marker">Är du säker på att du vill ta bort recensionen?</span>
            <div class="buttons">
                <button @click="confirmDelete" aria-label="Bekräfta borttagning av recension">Ja</button>
                <button @click="cancelDelete" aria-label="Avbryt borttagning av recension">Nej</button>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.custom_header {
  background-color: #fff7e3;
  padding: 20px;
}
#arrow_back {
    color: $creamwhite;
    font-weight: 700;
    font-size: 2rem;
    margin-top: 30px;
    margin-left: 20px;
}
.book_image {
  width: 100%;
  max-height: 200px;
  height: auto;
}
main {
  margin-bottom: 20px;
}

aside{
    background-color: $creamwhite;
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 100%;
    height: auto; 
    padding: 5px;
    
    article{
        background-color: $green;
        position: relative;
        border-radius: 8px;
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2),
                    inset -4px -4px 8px rgba(0, 0, 0, 0.2);
        margin: 10px 20px;
        width: 100%;
        padding: 10px 20px;
        max-width: 800px;
        
        .review_book{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
            padding-left: 0;            
            padding-right: 0;
        }

        .review_by_user{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;

            .line{
                width: 80%;
                height: 1px;
                background-color: $darkgreen;
                margin: 10px auto;
            }

            .user_review{
                display: flex;
                flex-direction: column;
                margin: 10px 0;

                .content{
                    display: flex; 
                    flex-direction: column;
                    width: 100%;

                    .stars{
                        display: flex;
                        justify-content: flex-start;
                        margin: 10px 0;

                        .star{
                            width: 20px;
                            height: 20px;
                            background-color: $creamwhite;
                            margin-right: 5px;
                            clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
                        }

                        .star.filled{
                            background-color: $warmorange;
                        }
                    }
                }

                .buttons{
                    display: flex;
                    width: 100%;
                    gap: 10px;
                    margin-top: 20px;
                    padding: 0 20px; // Lite mer utrymme på sidorna
                }
            }
        }

        .uppdate_user_review{
            background-color: $creamwhite;
            display: flex;
            flex-direction: column;
            border-radius: 8px;
            box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2),
                        inset -4px -4px 8px rgba(0, 0, 0, 0.2);
            margin: 10px 0;
            padding: 20px;

            .uppdate {
                display: flex; 
                flex-direction: column; 
                width: 100%;
                gap: 10px;
                padding: 10px;
                box-sizing: border-box;

                input, textarea {
                    width: 80%; 
                    padding: 5px;
                    border-radius: 4px;
                    border: 1px solid $darkgreen;
                }
            }

            .buttons{
                display: flex;
                justify-content: space-between; // Gör så att knapparna ligger närmare varandra
                width: 100%;
                gap: 10px;
                margin-top: 20px;
                padding: 0 20px; // Lite mer utrymme på sidorna
            }
        }

        .new_review{
            display: flex;
            flex-direction: column;
            margin: 10px 0;
            padding-left: 0;

            .form {
                display: flex; 
                flex-direction: column; 
                width: 100%;
                gap: 10px;
                padding: 10px;
                box-sizing: border-box;
            }

            .buttons{
                display: flex;
                justify-content: space-between; // Gör så att knapparna ligger närmare varandra
                width: 100%;
                gap: 10px;
                margin-top: 20px;
                padding: 0 20px; // Lite mer utrymme på sidorna
            }
        }
    }
}

button{
    flex: 1;
    max-width: 150px;
    @include primary-button;
}

h2{
    font-family: $H1;
    color: $creamwhite;
    font-size: $mobile_font_size_H2;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: $letter_spacing_H2;
    margin: 0 auto;
}


h3{
    font-family: $H1;
    color: $creamwhite;
    font-size: $mobile_font_size_H2;
    text-align: center;
    text-transform: uppercase;
    font-weight: 700;
    letter-spacing: $letter_spacing_H2;
}

p{
    width: 100%;
    font-family: $p;
    color: $creamwhite;
    font-size: $mobile_font_size_p;
    margin: 0;
    margin-bottom: 10px;
    font-size: $body-font; 
    line-height: 1.5;
}

.text_marker{
    font-family: $H3;
    font-size: 1.2em; 
    margin-bottom: 8px; 
    color: $creamwhite;
}


.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 247, 227, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;

    .modal{
        background-color: $green;
        border-radius: 8px;
        box-shadow: inset 4px 4px 8px rgba(0, 0, 0, 0.2),
                    inset -4px -4px 8px rgba(0, 0, 0, 0.2);
        padding: 20px;
        width: 300px;
        max-width: 90%;
        text-align: center;

        button{
            flex: 1;
            max-width: 150px;
            @include primary-button;
        }
    }
}


@media (min-width: 800px) {

    .book-image {
        max-width: 500px;  /* Minska storleken på mindre skärmar */
    }
    
    aside {
    padding: 20px;
  

    article {
        max-width: 90%;
        padding: 30px;

        .review_book {
            padding-left: 14%;            
            padding-right: 14%;
        }
        .review_by_user{
            .user_review{
                display: flex;
                flex-direction: row;

                .content{
                    width: 50%;
                    padding-left: 5%;
                    margin-left: 10%;
                }

                .buttons{
                    display: flex;
                    flex-direction: column;
                    width: 30%;
                    gap: 0;
                    margin: 0;
                    padding: 0;
                }
            }

            .user_uppdate {
                width: 60%;
                display: flex;
                flex-direction: row;
                margin-left: 15%;
            }
        }

        .new_review{
            display: flex;
            flex-direction: column;
            margin: 10px 0;
            padding-left: 14%;

            .form {
                display: flex; 
                flex-direction: column; 
                width: 80%;
                gap: 10px;
                padding: 10px;
                box-sizing: border-box;
            }

            .buttons{
                width: 50%;
                margin-left: 15%;
            }
        }
    }
}
}
</style>



