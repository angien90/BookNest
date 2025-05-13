<script setup>
import { ref, onMounted, watch, toRefs } from 'vue';
import { useRoute } from "vue-router";
import { defineProps, defineEmits } from 'vue';

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
  } catch (error) {
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

/*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*/
</script>

<template>
    <aside class="review" v-if="isLoaded">

        Bild
        {{ props.image }}

        <article class="review_container book">
            <div class="review_book">
                Tillfälligt: {{ props.bookId }}

                <h2>BokTitel {{ props.title }}</h2>
                <p>
                    Författare: {{ props.author }} <br>
                    Utgivningsår: {{ props.published_year }} <br>
                    Genre: {{ props.genres }} <br>
                    Beskrivning: {{ props.description }} <br>
                </p>
            </div>
        </article>
<!--*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*-->

        <article class="review_list">
            <h3>Vad tyckte andra om (bokens titel) {{ props.bookId }}?</h3>  
            <div class="review_by_user" v-for="reviews in review" :key="reviews._id">
                <div class="line"></div>

                <div class="user_review">
                    <div class="content">
                        <p>Så här tyckte {{ reviews.name }} om boken:<br>
                            {{ reviews.content }}
                        </p>
                        <div class="stars">
                            <div v-for="index in 5" :key="index" 
                                class="star" :class="{ filled: index <= reviews.rating }">
                            </div>
                        </div>
                            <p>Recensionen gjordes {{ formatDate(reviews.created_at) }}</p>
                    </div>

                    <div class="buttons" v-if="!(updateMode && updateReviewId === reviews._id)">
                        <button @click="deleteReview(reviews._id)">Ta bort</button>
                        <button @click="startUpdate(reviews)">Uppdatera</button>
                    </div>
                </div>

                <div class="uppdate_user_review">
                    <div class="user_uppdate" v-if="updateMode && updateReviewId === reviews._id">
                        <div class="uppdate">
                            <input type="text" v-model="updateName" placeholder="Ditt namn" />
                            <textarea v-model="updateContent" placeholder="Din recension"></textarea>
                            <input type="number" v-model="updateRating" min="1" max="5" placeholder="Betyg" />
                        </div>

                        <div class="buttons">
                            <button @click="updateReview">Spara</button>
                            <button @click="cancelUpdate">Avbryt</button>
                        </div>                
                    </div>
                </div>
            </div>
        </article>

<!--*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*-->

        <article class="review_form">
            <h2>Vad tyckte du om (bokens titel)?</h2>
            <p>Kanske höll du med någon annan läsare. Kanske har du en helt annan åsikt. <br>
                Lämna gärna en recension till nästa läsare. <br> 
                Men kom ihåg, inga spoilers!</p>

            <div class="new_review">
                <form class="form" @submit.prevent="createReview">
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
                </form>

                <div class="buttons">
                    <button type="submit">Skicka recension</button>
                    <button type="button" @click="clearForm">Avbryt</button>
                </div>        
            </div>
        </article>
    </aside>  

    <div v-if="deleteModalVisible" class="modal-overlay">
        <div class="modal">
            <p>Är du säker på att du vill ta bort recensionen?</p>
            <div class="buttons">
                <button @click="confirmDelete">Ja</button>
                <button @click="cancelDelete">Nej</button>
            </div>
        </div>
    </div>

</template>

<style scoped lang="scss">
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
  
        /*
        label{
            display: block;
            font-family: $p;
            font-weight: bold;
            font-size: 16px;
            margin: 10px 0 5px 0;
        }
        */
        
        .review_book{
            display: flex;
            flex-direction: column;
            gap: 10px;
            width: 100%;
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
                    gap: 15px;
                    padding: 10px;
                    padding-left: 10%;
                    box-sizing: border-box;

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
            display: flex;
            flex-direction: column;
            margin: 10px 0;

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

            .form {
                display: flex; 
                flex-direction: column; 
                width: 80%;
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
        display: flex;
        justify-content: center;
        font-family: $H1;
        color: $creamwhite;
        font-size: $mobile_font_size_H2;
        text-align: center;
    }

    h3{
        font-family: $H1;
        color: $creamwhite;
        font-size: $mobile_font_size_H3;
        text-align: center;
    }

    p{
        font-family: $p;
        color: $creamwhite;
        font-size: $mobile_font_size_p;
    }




.modal-overlay{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
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
  aside {
    padding: 20px;
  

  article {
    max-width: 90%;
    padding: 30px;

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

            .uppdate_user_review {
                background-color: $creamwhite;
                width: 50%;
                display: flex;
                flex-direction: row;
                margin-left: 25%;
            }
        }

                .new_review{
            display: flex;
            flex-direction: column;
            margin: 10px 0;

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

  .modal-overlay .modal {
    width: 400px;
  }
}
</style>



