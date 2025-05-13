<script setup>
</script>

<template>
  <main>
    <section class="card">
      <h2>Månadens tips</h2>
      <div class="card-section">
      <div>
        <img src="../assets/logo_small.png">
        <p>hämta data</p>
      </div>
      <div>
        <img src="../assets/logo_small.png">
        <p>hämta data</p>
      </div>
      <div>
        <img src="../assets/logo_small.png">
        <p>hämta data</p>
      </div>
    </div>
    </section>

    <section class="card">
      <h2>Nyheter</h2>
      <div class="card-section">
      <div>
        <img src="../assets/logo_small.png">
        <p>hämta data</p>
      </div>
      <div>
        <img src="../assets/logo_small.png">
        <p>hämta data</p>
      </div>
      <div>
        <img src="../assets/logo_small.png">
        <p>hämta data</p>
      </div>
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
    <div class="card-section">
    <div>
      <img src="../assets/logo_small.png">
      <p>hämta data + filtrering</p>
    </div>
    <div>
      <img src="../assets/logo_small.png">
      <p>hämta data + filtrering</p>
    </div>
    <div>
      <img src="../assets/logo_small.png">
      <p>hämta data + filtrering</p>
    </div>
    <div>
      <img src="../assets/logo_small.png">
      <p>hämta data + filtrering</p>
    </div>
  </div>
    </section>

    <section class="card">
      <h2>Lägg till en ny bok</h2>
      <form>
        <label for="title"><p>Titel</p></label>
        <input class="book-form" type="text" id="title" v-model="title" placeholder="Ange titel på boken" required/>

        <label for="description"><p>Beskrivning</p></label>
        <input class="book-form" type="text" id="description" v-model="description" placeholder="Beskriv boken kort" required/>

        <label for="author"><p>Författare</p></label>
        <input class="book-form" type="text" id="author" v-model="författare" placeholder="Ange författare på boken" required/>

        <label for="genres"><p>Genres</p></label>
        <input class="book-form" type="text" id="genres" v-model="genres" placeholder="Ange genres på boken" required/>

        <label for="images"><p>Bild</p></label>
        <input class="book-form" type="text" id="images" v-model="images" placeholder="Ange sökväg till bild på boken" required/>

        <label for="published_year"><p>Publiseringsår</p></label>
        <input class="book-form" type="text" id="published_year" v-model="published_year" placeholder="Ange året då boken skrevs" required/>
      
        <div class="buttons">
          <button type="submit">Lägg till</button>
          <button type="button" @click="clearForm">Avbryt</button>
        </div>
      </form>
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
  justify-content: space-around; 
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

  @media (min-width: 600px) {
    width: calc(50% - 20px);
  }

  @media (min-width: 900px) {
    width: calc(33.33% - 20px);
  }
}

img {
  width: 90%;
  height: auto;

  @media (min-width: 768px) {
  width: 60%; 
  }
}

p {
  font-family: $body-font;  
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

/* Möjlig hover-effekt för ikonerna */
.material-symbols-outlined:hover {
  font-size: 30px; 
}



h3 {
  font-family: $H1;
  color: $creamwhite;
  font-size: $mobile_font_size_H3;
}

p {
  font-family: $p;
  color: $creamwhite;
  font-size: $mobile_font_size_p;
}

.book-form {
  @include default-input;
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
</style>