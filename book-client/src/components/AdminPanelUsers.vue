<script setup>
import { ref, onMounted } from 'vue';

const API_URL = import.meta.env.VITE_API_URL;

const users = ref([]);
const errorMsg = ref('');

const fetchUsers = async () => {
  try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/users`, {
      credentials: 'include',
    });

    if (!response.ok) {
      errorMsg.value = '❌ Du har inte behörighet (endast admin)';
      return;
    }

    users.value = await response.json();
  } catch (err) {
    console.error('Error fetching users:', err);
    errorMsg.value = '❌ Kunde inte hämta användare';
  }
};

const deleteUser = async (id) => {
  const confirmDelete = confirm(
    'Är du säker på att du vill ta bort denna användare?'
  );
  if (!confirmDelete) return;

  try {
      const response = await fetch(`${API_URL.replace(/\/$/, '')}/users`, {
      method: 'DELETE',
      credentials: 'include',
    });

    if (response.ok) {
      users.value = users.value.filter((user) => user._id !== id);
    } else {
      errorMsg.value = '❌ Kunde inte ta bort användaren';
    }
  } catch (err) {
    console.error('Delete error:', err);
    errorMsg.value = '❌ Serverfel vid borttagning';
  }
};

onMounted(() => {
  fetchUsers();
});
</script>

<template>
  <RouterLink to="/" aria-label="Gå tillbaka till startsidan">
    <span class="material-symbols-outlined" id="arrow_back">arrow_back</span>
  </RouterLink>
  
  <div class="adminpanel">
    <h2>Adminpanel - Alla användare</h2>

    <div v-if="errorMsg" class="error">{{ errorMsg }}</div>

    <div v-if="users.length">
      <div v-for="user in users" :key="user._id">
        <div class="user">
          <p><strong>Användarnamn:</strong> {{ user.username }}</p>
          <p><strong>Lösenord (hashed):</strong> {{ user.password }}</p>
          <p><strong>Admin?:</strong> {{ user.is_admin ? 'Ja' : 'Nej' }}</p>
          <p>
            <strong>Skapad:</strong>
            {{ new Date(user.created_at).toLocaleString('sv-SE') }}
          </p>

          <button @click="deleteUser(user._id)">🗑️ Ta bort</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.adminpanel {
  position: relative;
  margin: 10px $spacing;
  border-radius: pxtorem(10px);
  background-color: $green;
  padding: $spacing;
  color: white;
  font-family: $H3;
  margin-bottom: $spacing;
  box-shadow: inset 0 4px 8px rgba(0, 0, 0, 0.2),
              inset 0 -2px 4px rgba(255, 255, 255, 0.1), 0 2px 6px rgba(0, 0, 0, 0.15);
}

h2 {
  font-family: $H2;
  font-size: 2rem;
  font-weight: 200;
  text-align: center;
  color: $creamwhite;
  margin-bottom: $spacing;
}

button {
  background: transparent;
  padding: 5px 10px;
  margin-block: pxtorem(10px);
  border: 1px dashed white;
  border-radius: 50px;
  cursor: pointer;
  color: white;
  transition: ease-in-out 0.15s;

  &:hover {
    background-color: rgba(56, 56, 56, 0.7);
  }
}

.user {
  margin-bottom: $spacing;

  p {
    white-space: normal;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
}

#arrow_back {
  color: $green;
  font-weight: 700;
  font-size: 2rem;
  margin-top: 30px;
  margin-left: 20px;
}

.error {
  width: fit-content;
  padding: 5px 20px;
  margin: 0 auto;
}
</style>
