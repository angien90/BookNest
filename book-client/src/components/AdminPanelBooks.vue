<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const books = ref([]);
const router = useRouter();

const goToAddBook = () => {
  router.push('/addbook');
};

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();
    books.value = data;
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

    <!-- Ändrat från länk till knapp -->
    <div class="buttons">
      <button @click="goToAddBook" class="buttons">Lägg till en ny bok</button>
    </div>

    <section class="card" id="allbooks">
      <h2>Alla böcker</h2>

      <div class="header-controls">
        <button class="filter-icon">
          <span class="material-symbols-outlined" aria-label="search icon">search</span>
        </button>
        <button class="filter-icon">
          <span class="material-symbols-outlined" aria-label="sort icon">sort</span>
        </button>
        <button class="filter-icon">
          <span class="material-symbols-outlined" aria-label="icon for sort by alpha">sort_by_alpha</span>
        </button>
      </div>

      <div class="card-section">
        <section v-for="book in books" :key="book._id" class="card-section div">
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