<script setup>
</script>

<template>
  <footer>
    <span class="contact-info">
      <span class="material-symbols-outlined">import_contacts</span> 
      <p>070 777 77 77</p>
    </span>

    <span class="social-media">
      <a href="https://www.instagram.com/" target="_blank">
        <img
          src="/assets/instagram-line.svg"
          width="30"
          height="30"
          alt="Sociala medier ikon för Instagram"
          loading="lazy"
        />
      </a>
      <a href="https://www.facebook.com/" target="_blank">
        <img
          src="/assets/facebook-fill.svg"
          width="30"
          height="30"
          alt="Sociala medier ikon för Facebook"
          loading="lazy"
        />
      </a>
    </span>
  </footer>
</template>

<style scoped lang="scss">
  footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 25px 25px;
    background-color: $green;
    color: $creamwhite;

    @media (min-width: 768px) {
      padding: 40px 90px;
    }
  }

  .contact-info {
    display: flex;
    flex-direction: row;
    gap: 15px;
    
    @media (min-width: 768px) {
      gap: 30px;
    }
  }

  .material-symbols-outlined {
    font-size: 30px;
  }

  p {
    font-family: $body-font;
    font-size: 1.2rem;
  }

  .social-media {
    display: flex;
    flex-direction: row;
    gap: 15px;

    @media (min-width: 768px) {
      gap: 30px;
    }
  }
</style>
