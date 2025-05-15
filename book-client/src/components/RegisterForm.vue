<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';


const username = ref('');
const password = ref('');
const error = ref('');
const router = useRouter();

const API_URL = import.meta.env.VITE_API_URL;

const registerUser = async () => {
  error.value = '';

  try {
    const response = await fetch(`${API_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    });

    if (!response.ok) {
      const data = await response.json();
      error.value = data.error || 'Registrering misslyckades';
      return;
    }

    router.push('/loginpage');
    alert('✅ Användaren registrerades. Nu kan du logga in!');
  } catch (err) {
    error.value = 'Användaren kunde inte registreras. Försök igen.'
  }
}
</script>

<template>
  <div class="register-container">
    <h2>Registrera dig</h2>
    <form @submit.prevent="registerUser">
      <label for="username">Användarnamn</label>
      <input v-model="username" id="username" type="text" required />

      <label for="password">Lösenord</label>
      <input v-model="password" id="password" required />

      <div v-if="error" class="error">{{ error }}</div>

      <button class="login-btn" type="submit">Registrera</button>
    </form>

    <RouterLink to="loginpage" class="login-link">Har du konto? Logga in</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.register-container {
  background-color: $green;
  padding: $spacing;
  border-radius: pxtorem(10px);
  width: 100%;
  max-width: pxtorem(300px);
  margin: $spacing auto;
  color: $creamwhite;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2),
              inset 0 -2px 4px rgba(255, 255, 255, 0.1),
              0 2px 6px rgba(0, 0, 0, 0.15);

  h2, .login-link {
    display: flex;
    flex-direction: column;
    justify-self: center;
  }

  h2 {
    font-family: $H2;
    font-weight: 200;
    font-size: $mobile_font_size_H1;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-self: center;
    width: 100%;
    max-width: pxtorem(260px);
    font-family: $H3;
    font-size: $mobile_font_size_link;
    margin-top: $spacing;

    input {
      @include default-input;
      height: 40px;
    }

    button {
        @include primary-button;
    }
  }

  .login-link {
    font-family: $link_font;
    color: $creamwhite;
    font-weight: bold;
    text-decoration: underline;
  }
}
</style>