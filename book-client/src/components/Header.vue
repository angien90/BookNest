<script setup>
import { ref } from 'vue';

const menuOpen = ref(false);

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

const scrollToSection = (id) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  }
  menuOpen.value = false;
};
</script>

<template>
  <header class="header">
    <div class="logo-heading">
      <img src="/assets/logo_big.webp" alt="Logo" />
      <h1><span class="first">Book</span><span class="second">Nest</span></h1>
    </div>

    <!-- Menu -->
    <div class="header-controls">
      <button :class="['menu-icon', { open: menuOpen }]" @click="toggleMenu">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </button>

      <div>
        <RouterLink to="adminusers">
          <button class="admin-icon">
            <span class="material-symbols-outlined admin-icon"
              >folder_supervised</span
            >
          </button>
        </RouterLink>

        <!-- Ikongubbe (höger) -->
        <RouterLink to="loginpage">
          <button class="user-icon">
            <span class="material-symbols-outlined user-icon">person</span>
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Mobile-menu -->
    <nav v-if="menuOpen" class="mobile-menu">
      <ul>
        <li @click="scrollToSection('tips')">Månadens tips</li>
        <li @click="scrollToSection('news')">Nyheter</li>
        <li @click="scrollToSection('allbooks')">Alla böcker</li>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  text-align: center;
  padding: 1rem;
}

.logo-heading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.logo-heading img,
.logo-heading h1 {
  margin: 0 auto;
  text-align: center;

  @media (min-width: 768px) {
    margin-bottom: 20px;
  }
}

img {
  height: auto;
  width: 40%;
  max-width: 500px;

  @media (min-width: 768px) {
    width: 50%;
    max-width: 800px;
  }
}

.first {
  color: $warmorange;
}

.second {
  color: $green;
}

h1 {
  text-transform: uppercase;
  overflow: hidden;
  color: $creamwhite;
  width: auto;
  max-width: 100%;
  height: auto;
  flex-shrink: 0;
  font-family: $heading-font;
  font-size: 2rem;
  margin: 0 0 5px 0;
  z-index: 1;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  @media (min-width: 1280px) {
    margin-left: 9.5rem;
    font-size: pxtorem(128px);
    font-style: normal;
    font-weight: 400;
    line-height: 0.54;
    letter-spacing: -2.816px;
    overflow: visible;
    margin-bottom: 50px;
  }
}

.header-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  padding: 0 20px;
  z-index: 2;
}

// Navbar
.user-icon,
.admin-icon {
  background: transparent;
  border: none;
  cursor: pointer;
  width: 55px;
}

.material-symbols-outlined {
  font-size: 40px;
  font-variation-settings: 'wght' 700;
  color: $green;
}

.menu-icon {
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
}

button.menu-icon {
  background: transparent;
  border: none;
  top: 0;
  right: 20px;
  display: flex;
  flex-direction: column;
  gap: 3px;
  cursor: pointer;
  z-index: 2;
}

.bar {
  width: 35px;
  height: 7px;
  background-color: $green;
  border-radius: 50px;
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
}

.menu-icon.open .bar:nth-child(1) {
  transform: translateY(10px) rotate(45deg);
}

.menu-icon.open .bar:nth-child(2) {
  opacity: 0;
}

.menu-icon.open .bar:nth-child(3) {
  transform: translateY(-10px) rotate(-45deg);
}

.mobile-menu {
  position: absolute;
  top: 0;
  right: 0;
  background: $green;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100vh;
  width: 100vw;
  z-index: 1;
}

.mobile-menu ul {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  list-style: none;
  padding-right: 20px;
  margin: 0;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
}

.mobile-menu li {
  padding: 10px 0;
  text-align: right;
  font-size: 1.1rem;
  color: $creamwhite;
  width: 216px;
  height: 54px;
  font-size: pxtorem(32px);
  font-family: $body-font;
  font-style: normal;
  letter-spacing: -0.792px;
  line-height: 150%;
  font-weight: 400;
  padding-top: 50px;

  @media (min-width: 768px) {
    text-align: left;
  }
}

.mobile-menu a {
  text-decoration: none;
  color: $creamwhite;
}

.menu-icon.open .bar:nth-child(1),
.menu-icon.open .bar:nth-child(3) {
  background-color: $creamwhite;
}

.mobile-menu a:hover {
  text-decoration: underline;
}
</style>
