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
    <div class="addbook">
      <RouterLink to="/addbook">Lägg till en bok</RouterLink>
    </div>
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