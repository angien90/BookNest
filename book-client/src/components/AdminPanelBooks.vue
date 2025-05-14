<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const books = ref([]);
const searchText = ref('');
const selectedGenre = ref('Alla');
const genres = ref([]); // Lista för alla tillgängliga kategorier
const router = useRouter();

const filteredBooks = computed(() => {
  return books.value.filter(book => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchText.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchText.value.toLowerCase());

    const matchesGenre =
      selectedGenre.value === 'Alla' || book.genres.includes(selectedGenre.value);

    return matchesSearch && matchesGenre;
  });
});

const goToAddBook = () => {
  router.push('/addbook');
};

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    books.value = data;

    // Extrahera un lista med unika genrer
    genres.value = [...new Set(books.value.flatMap(book => book.genres))];
  } catch (error) {
    console.log("Fel vid hämtning av böcker:", error);
  }
});
</script>

<template>
  <main>
    <RouterLink to="/">
      <span class="material-symbols-outlined" id="arrow_back">arrow_back</span>
    </RouterLink>

    <div class="buttons">
      <button @click="goToAddBook" class="buttons">Lägg till en ny bok</button>
    </div>

    <section class="card" id="allbooks">
      <h2>Alla böcker</h2>

      <div class="filter-bar">
        <input
          type="text"
          v-model="searchText"
          placeholder="Sök titel eller författare"
          class="filter-input"
        />

        <select v-model="selectedGenre" class="filter-select">
          <option>Alla</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>

      <div class="card-section">
        <section v-for="book in filteredBooks" :key="book._id" class="card-section div">
          <article>
            <div>
              <p>{{ book.title }}</p>
              <p>{{ book.author }}</p>
              <p>{{ book.genres.join(', ') }}</p>
              <p>{{ book.created_at }}</p>
            </div>
          </article>
        </section>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin-bottom: 20px;
}

#arrow_back {
    color: $green;
    font-weight: 700;
    font-size: 2rem;
    margin-top: 30px;
    margin-left: 20px;
}

/* Knapp för att lägga till en ny bok */
.buttons {
  display: flex;
  justify-content: flex-end;
  padding: 0;
  margin: 0;

  button {
    flex: 1;
    max-width: 250px;
    @include primary-button;
  }
}

.card {
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

.card-section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 20px; 
}

.card-section div {
  width: 100%; 
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  color: $creamwhite;
  padding: 15px;
  transition: background-color 0.3s ease;
  border-radius: 8px;
  border: 1px solid $creamwhite;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 768px) {
    justify-content: center;
    padding: 10px;
  }
}

article {
  width: 100%; 
  display: flex;
  flex-direction: column;
}

p {
  width: 100%;
  font-family: $p;
  margin: 0;
  margin-bottom: 10px;
  font-size: $body-font; 
  color: $creamwhite;
  line-height: 1.5;
}

/* Filterbar */
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px;
  align-items: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: center;
  }
}

.filter-input,
.filter-select {
  padding: 8px 12px;
  border-radius: 6px;
  border: none;
  font-size: 1rem;
  background-color: $creamwhite;
  font-family: $body_font;
}

/* Header Controls */
.header-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin-right: -10px;
  gap: 0; 

  @media (min-width: 768px) {
    position: absolute;
    justify-content: flex-end;
    z-index: 10; 
    gap: 10px;
    right: 20px;
    top: 10px;
  }
}

/* Filtrerings ikonerna */
.filter-icon {
  background: transparent;
  border: none;
  cursor: pointer; 
}

.material-symbols-outlined {
  font-size: 25px;
  font-variation-settings: "wght" 700;
  color: $creamwhite; 
}

.material-symbols-outlined:hover {
  font-size: 30px; 
}
</style>
