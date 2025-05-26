<script setup>
import { ref, computed, onMounted, nextTick } from 'vue';
import { useRoute } from 'vue-router';
import { RouterLink } from 'vue-router';

const API_URL = import.meta.env.VITE_API_URL;

const route = useRoute();
const tipBooks = ref([]);
const newsBooks = ref([]);
const books = ref([]);
const searchText = ref('');
const selectedGenre = ref('Alla');
const genres = ref([]); // Lista för alla tillgängliga kategorier

const tipIds = [
  '681a50fe1e028ec32ca8a32e',
  '681a531a0079c7a5fb29c29a',
  '681a531a0079c7a5fb29c29e'
];

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

onMounted(async () => {
  try {
    const response = await fetch(`${API_URL.replace(/\/$/, '')}/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const data = await response.json();
    books.value = data;

    // Extrahera un lista med unika genrer
    genres.value = [...new Set(books.value.flatMap(book => book.genres))];

    tipBooks.value = books.value.filter(book => tipIds.includes(book._id));

    // Sortera på nyaste först (descending) och ta de tre senaste
    newsBooks.value = [...books.value]
    .filter(book => book.created_at)
    .sort((a, b) => b._id.localeCompare(a._id))
    .slice(0, 3);

    // Scrolla först EFTER data och DOM är klar
    const scrollTo = route.query.scrollTo;
    if (scrollTo) {
      nextTick(() => {
        setTimeout(() => {
          const el = document.getElementById(scrollTo);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }, 300);
      });
    }
  } catch (error) {
    console.log("Fel vid hämtning av böcker:", error);
  }
});

</script>


<template>
  <main>
    <section class="card" id="tips">
      <h2>Månadens tips</h2>
      <div class="card-section">
      <section v-for="book in tipBooks" :key="book._id" class="card-section">
        <RouterLink :to="`/bookpage/${book._id}`" class="booklink" :aria-label="`Visa detaljer för boken ${book.title} av ${book.author}`">
          <article>
            <div>
              <img :src="'/public/images/' + book.image" :alt="book.title" width="300" height="400" fetchpriority="high">
              <h3>Titel:</h3>
              <p>{{ book.title }}</p>
              <h3>Författare:</h3>
              <p>{{ book.author }}</p>
              <h3>År:</h3>
              <p>{{ book.published_year }}</p>
              <h3>Genres:</h3>
              <p>{{ book.genres.join(', ') }}</p>
            </div>
          </article>
        </RouterLink>
      </section>
      </div>
    </section>

    <section class="card" id="news">
      <h2>Nyheter</h2>
      <div class="card-section">
      <section v-for="book in newsBooks" :key="book._id" class="card-section div">
        <RouterLink :to="`/bookpage/${book._id}`" class="booklink" :aria-label="`Visa detaljer för boken ${book.title} av ${book.author}`">
        <article>
          <div>
             <img :src="'/images/' + book.image" :alt="book.title" width="300" height="400" fetchpriority="high">
            <h3>Titel:</h3>
            <p>{{ book.title }}</p>
            <h3>Författare:</h3>
            <p>{{ book.author }}</p>
            <h3>År:</h3>
            <p>{{ book.published_year }}</p>
            <h3>Genres:</h3>
            <p>{{ book.genres.join(', ') }}</p>
          </div>
        </article>
        </RouterLink>
      </section>
      </div>
    </section>

    <section class="card" id="allbooks">
    <h2>Alla böcker</h2>

    <div class="adminpanel">
      <RouterLink to="/adminpanelbooks">Hantera böcker</RouterLink>
    </div>

    <div class="filter-bar">
      <div class="filter-group">
        <label for="search" class="sr-only">Sök</label>
        <input
          id="search"
          type="text"
          v-model="searchText"
          placeholder="Sök titel eller författare"
          class="filter-input"
        />
      </div>

      <div class="filter-group">
        <label for="genre-select" class="sr-only">Välj genre</label>
        <select id="genre-select" v-model="selectedGenre" class="filter-select">
          <option>Alla</option>
          <option v-for="genre in genres" :key="genre" :value="genre">{{ genre }}</option>
        </select>
      </div>
    </div>
    
    <div class="card-section">
      <section v-for="book in filteredBooks" :key="book._id" class="card-section div">
        <RouterLink :to="`/bookpage/${book._id}`" class="booklink" :aria-label="`Visa detaljer för boken ${book.title} av ${book.author}`">
        <article>
          <div>
             <img :src="'/images/' + book.image" :alt="book.title" width="300" height="400" fetchpriority="high">
            <h3>Titel:</h3>
            <p>{{ book.title }}</p>
            <h3>Författare:</h3>
            <p>{{ book.author }}</p>
            <h3>År:</h3>
            <p>{{ book.published_year }}</p>
            <h3>Genres:</h3>
            <p>{{ book.genres.join(', ') }}</p>
          </div>
        </article>
        </RouterLink>
      </section>
    </div>
</section>

  </main>
</template>

<style lang="scss" scoped>
main {
  margin-bottom: 20px;
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
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px; 

  @media (min-width: 768px) {
    justify-content: space-evenly; 
  }
}

.card-section div {
  width: 400px; 
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

img {
  width: 30%;
  max-width: 200px; 
  height: auto;
  border-radius: 8px; 
  margin-bottom: 15px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  box-shadow:
    -10px 0 6px -2px rgba(0, 0, 0, 0.5),  /* vänster sida */
    0 6px 6px -2px rgba(0, 0, 0, 0.5);   /* undersida */

  &:hover {
    transform: scale(1.03);
    box-shadow:
      -8px 0 8px -2px rgba(0, 0, 0, 0.6),
      0 8px 8px -2px rgba(0, 0, 0, 0.6);
  }

  @media (min-width: 768px) {
  height: 200px;
  width: auto;
  }
}

h3 {
  font-family: $H3;
  font-size: 1.2em; 
  margin-bottom: 8px; 
  color: $creamwhite;
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

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Länk för att lägga till en ny bok */
.adminpanel {
  display: flex;
  justify-content: center;
  margin: 20px;
  margin-right: 0px;
  margin-top: 0;

  @media (min-width: 768px) {
      justify-content: flex-end;
    }

  a {
    text-decoration: none;
    background-color: $green;
    color: $creamwhite;
    border-radius: 8px;
    font-family: $link_font;
    font-size: $mobile_font_size_link;
    transition: background-color 0.3s ease;

    &:hover {
      text-decoration: underline;
    }

    &:active {
      transform: scale(0.98);
    }
  }
}

.booklink {
  text-decoration: none;
  color: inherit;
}
</style>