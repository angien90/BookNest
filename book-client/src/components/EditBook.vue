<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const successMessage = ref('');
const errorMessage = ref('');
const route = useRoute();
const bookId = route.params.id; 
const router = useRouter();

const book = ref({
  title: '',
  author: '',
  genres: [],
  created_at: ''
});

// Hämta bokinfo vid laddning
onMounted(async () => {
  console.log("✅ Param ID från route:", bookId);

  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      credentials: 'include'
    });

    const data = await response.json();
    console.log("📚 Hämtar bok med ID:", bookId);
    book.value = data;
  } catch (error) {
    console.error("❌ Kunde inte hämta bok:", error);
  }
});

// Uppdatera boken
const updateBook = async () => {
  try {
    const response = await fetch(`http://localhost:3000/books/${bookId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      credentials: "include", 
      body: JSON.stringify(book.value),
    });

    if (!response.ok) {
      const data = await response.json();
      errorMessage.value = data.message || `Fel vid uppdatering: ${response.status}`;
      successMessage.value = '';
      return; // Avbryt vidare körning vid fel
    }

    successMessage.value = "✅ Boken uppdaterades!";
    errorMessage.value = '';
  } catch (error) {
    console.error("Fel vid submit:", error.message);
    errorMessage.value = error.message || "❌ Kunde inte uppdatera boken. Försök igen.";
    successMessage.value = '';
  }
};
</script>

<template>
  <main>
    <RouterLink to="/adminpanelbooks" aria-label="Gå tillbaka till startsidan">
      <span class="material-symbols-outlined" id="arrow_back">arrow_back</span>
    </RouterLink>

    <section class="card">
      <h2>Redigera bok</h2>

      <form @submit.prevent="updateBook" v-if="book">
        <label for="image"><p>Bild</p></label>
<input class="book-form" type="text" id="image" v-model="book.image" required/>

        <label for="title"><p>Titel</p></label>
        <input class="book-form" type="text" id="title" v-model="book.title" required/>

        <label for="author"><p>Författare</p></label>
        <input class="book-form" type="text" id="author" v-model="book.author" required/>

        <label for="genres"><p>Genres</p></label>
        <input class="book-form" type="text" id="genres" v-model="genresStr" placeholder="Komma-separerade genrer"/>

        <label for="description"><p>Beskrivning</p></label>
        <input class="book-form" type="text" id="description" v-model="book.description"/>

        <label for="image"><p>Bild</p></label>
        <input class="book-form" type="text" id="image" v-model="book.image"/>

        <label for="published_year"><p>Publiceringsår</p></label>
        <input class="book-form" type="number" id="published_year" v-model="book.published_year"/>

        <div v-if="successMessage" class="success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>

        <div class="buttons">
          <button type="submit">Spara</button>
          <button type="button" @click="router.push('/adminpanelbooks')">Avbryt</button>
        </div>
      </form>

      <p v-else>Laddar bokinformation...</p>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin-bottom: 20px;
  background-color: $creamwhite;
}

#arrow_back {
  color: $green;
  font-weight: 700;
  font-size: 2rem;
  margin-top: 30px;
  margin-left: 20px;
}

section {
  background-color: $green;
  position: relative;
  margin: 10px 20px;
  padding: 10px 20px;
  border-radius: 8px;
}

h2 {
  text-align: center;
  text-transform: uppercase;
  font-family: $H1;
  color: $creamwhite;
  font-weight: 700;
  letter-spacing: $letter_spacing_H2;
  font-size: $mobile_font_size_H2;
}

p, input {
  color: $creamwhite;
  font-family: $body-font;
}

.book-form {
  @include default-input;
  width: 100%;
}

.buttons {
  display: flex;
  justify-content: space-around;
  width: 100%;
  gap: 10px;
  margin-top: 20px;
  padding: 0 10px;

  button {
    flex: 1;
    max-width: 150px;
    @include primary-button;
  }
}

/* Errormeddelande */
.success {
    color: green;
    background-color: #e6ffe6;
    text-align: center;
    padding: 10px;
    margin-top: 30px;
    border-radius: 5px;
}

.error {
    color: red;
    background-color: #ffe6e6;
    text-align: center;
    padding: 10px;
    margin-top: 30px;
    border-radius: 5px;
}
</style>
