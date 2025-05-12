<script setup>
</script>

<template>
  <main>
    <section class="card">
      <h2>Månadens tips</h2>
      <span class="card-section">
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
      </span>
    </section>

    <section class="card">
      <h2>Nyheter</h2>
      <span class="card-section">
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
      </span>
    </section>

    <section class="card">
    <div class="header-controls">
      <button class="filter-icon">
        <span class="material-symbols-outlined">search</span>
      </button>
      <button class="filter-icon">
        <span class="material-symbols-outlined">sort</span>
      </button>
      <button class="filter-icon">
        <span class="material-symbols-outlined">sort_by_alpha</span>
      </button>
    </div>

    <h2>Alla böcker</h2>
    <span class="card-section">
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
    </span>
    </section>

    <section class="card">
      <h2>Lägg till en ny bok</h2>
      <form class="book-form">
        <label for="title"><p>Titel</p></label>
        <input type="text" id="title" v-model="titel" placeholder="Ange titel på boken" required/>

        <label for="description"><p>Beskrivning</p></label>
        <input type="text" id="description" v-model="description" placeholder="Beskriv boken kort" required/>

        <label for="author"><p>Författare</p></label>
        <input type="text" id="author" v-model="författare" placeholder="Ange författare på boken" required/>

        <label for="genres"><p>Genres</p></label>
        <input type="text" id="genres" v-model="genres" placeholder="Ange genres på boken" required/>

        <label for="images"><p>Bild</p></label>
        <input type="text" id="images" v-model="images" placeholder="Ange sökväg till bild på boken" required/>

        <label for="published_year"><p>Publiseringsår</p></label>
        <input type="text" id="published_year" v-model="published_year" placeholder="Ange året då boken skrevs" required/>
      </form>
      
      <Button class="button" buttonText="Lägg till" />
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
  font-family: $heading-font;
  color: $creamwhite;
  font-weight: 32px;
  letter-spacing: 2px;
}

.card-section {
  display: flex;
  flex-wrap: wrap; 
  justify-content: space-around; 
  gap: 20px; 
}

.card-section div {
  width: calc(33.33% - 20px);
  box-sizing: border-box;
  display: flex;   
  flex-direction: column;            
  justify-content: center;     
  align-items: center;        
  text-align: center; 
  color: $creamwhite;
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
</style>