<script setup></script>

<template>
  <div class="login-container">
    <h2>Logga in</h2>
    <form>
      <label for="username">Användarnamn</label>
      <input v-model="username" id="username" type="text" required />

      <label for="password">Lösenord</label>
      <input v-model="password" id="password" required />

      <button class="login-btn" type="submit">Logga in</button>
    </form>

      <RouterLink to="RegisterView" class="register-link">Registrera dig</RouterLink>
  </div>
</template>

<style lang="scss" scoped>
.login-container {
  background-color: $green;
  padding: $spacing;
  border-radius: pxtorem(10px);
  width: pxtorem(300px);
  margin: $spacing auto;
  color: $creamwhite;

  h2, .register-link {
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
    width: fit-content;
    font-family: $H3;
    font-size: $mobile_font_size_link;

    input {
        outline: none;
        border: none;
        margin-bottom: pxtorem(10px);
        border-radius: pxtorem(5px);
        width: pxtorem(200px);
        background-color: $creamwhite;
        padding: 7px;
    }

    button {
        @include primary-button;
    }
  }

  .register-link {
    font-family: $link_font;
    color: $creamwhite;
    font-weight: bold;
    text-decoration: underline;
  }
}
</style>
