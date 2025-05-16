<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const menuOpen = ref(false);
const router = useRouter();
const route = useRoute();

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value;
};

function scrollToSection(id) {
  menuOpen.value = false;

  if (route.path === '/') {
    scrollAfterNavigation(id);
  } else {
    router.push({ path: '/', query: { scrollTo: id } });
  }
}

function scrollAfterNavigation(id) {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.warn(`Element med id '${id}' hittades inte`);
  }
}
</script>

<template>
  <header class="header">
    <RouterLink to="/" class="logo-heading" aria-label="Gå till startsidan">
      <slot name="logo"> 
        <img src="/assets/logo_big.webp" alt="Logo" />
        <h1><span class="first">Book</span><span class="second">Nest</span></h1>
      </slot>
    </RouterLink>

    <!-- Menu -->
    <div class="header-controls">
      <button :class="['menu-icon', { open: menuOpen }]" @click="toggleMenu" aria-label="Öppna meny">
        <div class="bar"></div>
        <div class="bar"></div>
        <div class="bar"></div>
      </button>

      <div>
        <RouterLink to="adminpanelusers">
          <button class="admin-icon" aria-label="Gå till adminpanelen för användare">
            <span class="material-symbols-outlined admin-icon">folder_supervised</span>
          </button>
        </RouterLink>

        <!-- Ikongubbe (höger) -->
        <RouterLink to="loginpage">
          <button class="user-icon" aria-label="Logga in">
            <span class="material-symbols-outlined user-icon">person</span>
          </button>
        </RouterLink>
      </div>
    </div>

    <!-- Mobile-menu -->
    <nav v-if="menuOpen" class="mobile-menu">
      <ul>
        <li><RouterLink to="/" exact-active-class="active" @click="menuOpen = false"><span>Hem</span></RouterLink></li>
        <li @click="scrollToSection('tips')"><span>Månadens tips</span></li>
        <li @click="scrollToSection('news')"><span>Nyheter</span></li>
        <li @click="scrollToSection('allbooks')"><span>Alla böcker</span></li>
        <li><RouterLink to="adminpanelusers"><span class="admin-only">(admin) Användaren</span></RouterLink></li>
        <li><RouterLink to="adminpanelbooks"><span class="admin-only">(admin) Böcker</span></RouterLink></li>
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
  text-decoration: none;
}

.logo-heading img,
.logo-heading h1 {
  margin: 0 auto;
  text-align: center;
}

img {
  height: auto;
  width: 40%;
  max-width: 500px;

  @media (min-width: 768px) {
    max-width: 600px;
  }

  @media (min-width: 1280px) {
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
  font-size: $mobile_font_size_H1;
  z-index: 1;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  line-height: 1;

  @media (min-width: 768px) {
    font-size: 3rem;
  }

  @media (min-width: 1280px) {
    font-size: 4rem;
    font-weight: 400;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: $green;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1rem;
  height: 100vh;
  width: 100vw;
  z-index: 1;
}

.mobile-menu ul {
  align-items: flex-end;
  list-style: none;
  justify-content: center;

  @media (min-width: 768px) {
    align-items: flex-start;
  }
}

.mobile-menu li {
  padding: $spacing $spacing 0 0; 
  text-align: right;
  font-size: pxtorem(32px);
  color: $creamwhite;
  font-family: $body-font;
  letter-spacing: -0.7px;
  font-weight: bold;
  text-transform: uppercase;

  a {
      text-decoration: none;
      color: inherit;
    }

  span {
    cursor: pointer;
    position: relative;
    display: inline-block;

    &::after {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0; // align with text-align: right
    height: 2px;
    width: 0%;
    background-color: currentColor;
    transition: width 0.3s ease;
    }

    &:hover::after {
      width: 100%;
    }

    @media (min-width: 768px) {
      font-size: pxtorem(40px);
      text-align: left;

      &::after {
        left: 0;
        right: auto;
      }
    }
  }

  @media (min-width: 768px) {
    font-size: pxtorem(40px);
    text-align: left;
    padding-left: $spacing;
  }

  .admin-only {
    font-size: 1rem;
  }
}


.menu-icon.open .bar:nth-child(1),
.menu-icon.open .bar:nth-child(3) {
  background-color: $creamwhite;
}
</style>
