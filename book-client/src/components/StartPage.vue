<script setup>
import { ref, onMounted } from 'vue';

const tipBooks = ref([]);
const newsBooks = ref([]);
const books = ref([]); // Reaktiv variabel för böcker

/* Månadens tips */
const tipIds = [
  '681a50fe1e028ec32ca8a32e',  
  '681a531a0079c7a5fb29c29a',
  '681a531a0079c7a5fb29c29e'
];

onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/books');
    const data = await response.json();

    console.log("Alla böcker från API:", JSON.parse(JSON.stringify(data))); // Logga den hämtade datan, plattad

    // Alla böcker
    books.value = data;

    // Månadens tips
    tipBooks.value = books.value.filter(book => tipIds.includes(book._id));

    // Kontrollera om böckerna har created_at innan vi filtrerar
    const booksWithCreatedAt = books.value.filter(book => book.created_at);
    console.log("Böcker som har created_at:", JSON.parse(JSON.stringify(booksWithCreatedAt)));

    // Nyheter: sortera på created_at (senaste först) och ta de 3 första
    newsBooks.value = [...books.value]
      .filter(book => book.created_at) // Filtrera böcker med created_at
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at)) // Sortera på created_at
      .slice(0, 3);

    // Logga resultatet efter filtrering och sortering
    console.log("Nyhetsböcker efter filtrering och sortering:", JSON.parse(JSON.stringify(newsBooks.value))); // Logga resultatet, plattad

  } catch (error) {
    console.log("Fel vid hämtning av böcker:", error);
  }
});
</script>



<template>
  <main>
    <section class="card">
      <h2>Månadens tips</h2>
      <div class="card-section">
      <section v-for="book in tipBooks" :key="book._id" class="card-section div">
        <article>
          <div>
            <img :src="'/fed24d-grupp15/images/' + book.image" :alt="book.title">
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
      </section>
      </div>
    </section>

    <section class="card">
      <h2>Nyheter</h2>
      <div class="card-section">
      <section v-for="book in newsBooks" :key="book._id" class="card-section div">
        <article>
          <div>
            <img :src="'/fed24d-grupp15/images/' + book.image" :alt="book.title">
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
      </section>
      </div>
    </section>

    <section class="card">
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

    <h2>Alla böcker</h2>
    <div class="addbook">
      <RouterLink to="/addbook">Lägg till en bok</RouterLink>
    </div>
    
    <div class="card-section">
      <section v-for="book in books" :key="book._id" class="card-section div">
        <article>
          <div>
            <img :src="'/fed24d-grupp15/images/' + book.image" :alt="book.title">
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
  padding: 10px 10px;

  @media (min-width: 768px) {
    justify-content: space-around; 
    padding: 10px 50px;
  }
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
}

  article {
  width: 100%; 
  display: flex;
  flex-direction: column;
}

img {
  width: 50%;
  height: auto;

  @media (min-width: 768px) {
  height: 250px;
  width: auto;

  }
}

h3 {
  font-family: $H3;
}

p {
  width: 100%; 
  font-family: $p;
  margin: 0;
  margin-bottom: 10px; 
}

/* Filterbar */
.header-controls {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 0;
  margin-right: -10px;
  gap: 0; 

  @media (min-width: 768px) {
      position: absolute;
      z-index: 10; 
      gap: 10px;
      right: 20px;
      top: 10px;
    }
}

.filter-icon {
  background: transparent;
  border: none; 
}

.material-symbols-outlined {
  font-size: 25px;
  font-variation-settings: "wght" 700;
  color: $creamwhite; 
}

/* Hover-effekt för ikonerna */
.material-symbols-outlined:hover {
  font-size: 30px; 
}


/* Länk för att lägga till en ny bok */
.addbook {
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
</style>