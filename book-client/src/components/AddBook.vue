<script setup>
    import { reactive, ref } from 'vue';

    const API_URL = import.meta.env.VITE_API_URL;
    
    const form = reactive({
        "title": "",
        "description": "",
        "author": "",
        "genres": "",
        "images": "",
        "published_year": ""
        })

        const successMessage = ref('');
        const errorMessage = ref('');

        const clearForm = () => {
        Object.keys(form).forEach(key => {
            form[key] = "";
            })
        }

        const submit = async () => {
            try {
                await fetch(API_URL + '/', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(form)
                })

            if (!response.ok) {
            throw new Error("Något gick fel!");
            }

            successMessage.value = "Boken har lagts till!";
            errorMessage.value = "";
            clearForm();

        } catch (error) {
            console.error(error);
            successMessage.value = "";
            errorMessage.value = "Kunde inte spara boken. Försök igen.";
        }
        };
</script>

<template>
  <main>
    <RouterLink to="/"><span class="material-symbols-outlined">arrow_back</span></RouterLink>
  <section class="card">
      <h2>Lägg till en ny bok</h2>
      <form @submit.prevent="submit">
        <label for="title"><p>Titel</p></label>
        <input class="book-form" type="text" id="title" v-model="form.title" placeholder="Ange titel på boken" required/>

        <label for="description"><p>Beskrivning</p></label>
        <input class="book-form" type="text" id="description" v-model="form.description" placeholder="Beskriv boken kort" required/>

        <label for="author"><p>Författare</p></label>
        <input class="book-form" type="text" id="author" v-model="form.author" placeholder="Ange författare på boken" required/>

        <label for="genres"><p>Genres</p></label>
        <input class="book-form" type="text" id="genres" v-model="form.genres" placeholder="Ange genres på boken" required/>

        <label for="images"><p>Bild</p></label>
        <input class="book-form" type="text" id="images" v-model="form.images" placeholder="Ange sökväg till bild på boken" required/>

        <label for="published_year"><p>Publiseringsår</p></label>
        <input class="book-form" type="number" id="published_year" v-model="form.published_year" placeholder="Ange året då boken skrevs" required/>
      
        <div class="buttons">
          <button type="submit">Lägg till</button>
          <button type="button" @click="clearForm">Avbryt</button>
        </div>

        <div v-if="successMessage" class="success">{{ successMessage }}</div>
        <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
      </form>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  margin-bottom: 20px;
  background-color: $creamwhite;
}

.material-symbols-outlined {
    color: $green;
    font-weight: 700;
    font-size: 2rem;
    margin-top: 10px;
    margin-left: 20px;
}

section {
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

.success {
  color: green;
  background-color: #e6ffe6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}

.error {
  color: red;
  background-color: #ffe6e6;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>