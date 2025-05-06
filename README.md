# 📚 Book API – lösenordsskyddat boksystem med MongoDB och användarhantering

## 🔍 Projektbeskrivning

Detta projekt är ett fullstack-baserat bokhanteringssystem som bygger på **MongoDB** som databas. API:t är lösenordsskyddat och erbjuder funktionalitet för att hantera **användare**, **böcker** och **recensioner**. Projektet har stöd för inloggning, adminpanel samt en besökardel där man kan bläddra bland böcker och lämna recensioner.

Målet är att skapa ett system som är uppdelat i tydliga ansvarsområden med separata API-endpoints för varje datatyp, och där viss funktionalitet kräver autentisering med **JSON Web Tokens (JWT)**.

---

## 🗄️ Databasstruktur – MongoDB

Alla data lagras i en MongoDB-databas med tre huvudsakliga samlingar (collections):

### `users`
Lagrar information om registrerade användare:
- `username`: *String*
- `password`: *String*
- `is_admin`: *Boolean*
- `created_at`: *Date*

### `books`
Innehåller information om böcker samt referens till recensioner:
- `title`: *String*
- `description`: *String*
- `author`: *String*
- `genres`: *Array*
- `image`: *String*
- `published_year`: *Number*
- `reviews`: *[{ type: ObjectId, ref: "Reviews" }]*

### `reviews`
Recensioner som hör till specifika böcker:
- `name`: *String*
- `content`: *String*
- `rating`: *Number (1–5)*
- `created_at`: *Date*

---

## 🔌 API Endpoints

### 👤 Användare (`/users`)
- `GET /users` – Hämta alla användare
- `GET /users/:id` – Hämta en användare
- `PATCH /users/:id` – Uppdatera användare *(kräver JWT)*
- `DELETE /users/:id` – Radera användare *(kräver JWT)*

### 🔐 Autentisering (`/auth`)
- `POST /auth/register` – Registrera ny användare
- `POST /auth/login` – Logga in
- `POST /auth/logout` – Logga ut

### 📚 Böcker (`/books`)
- `GET /books` – Hämta alla böcker
- `GET /books/:id` – Hämta specifik bok inkl. recensioner
- `POST /books` – Skapa ny bok *(kräver JWT)*
- `PATCH /books/:id` – Uppdatera bok *(kräver JWT)*
- `DELETE /books/:id` – Radera bok *(kräver JWT)*

### ✍️ Recensioner (`/reviews`)
- `GET /reviews` – Hämta alla recensioner
- `GET /reviews/:id` – Hämta en recension
- `POST /reviews` – Skapa ny recension
- `PATCH /reviews/:id` – Uppdatera recension *(kräver JWT)*
- `DELETE /reviews/:id` – Radera recension *(kräver JWT)*

---

## 🖥️ Klientgränssnitt

### 🔐 Autentisering
- **Registrering**
  - Fält: `username`, `password`
- **Inloggning**
  - Fält: `username`, `password`

### 🛠️ Adminpanel (skyddad)
- **Användarlista**
  - Visar: `username`, `password`, `is_admin`, `created_at`
- **Boklista**
  - Visar: `title`, `author`, `genres`, `created_at`
- **Ny bok**
  - Formulär med alla fält enligt `books`-strukturen

### 🌍 Publik vy
- **Boklista**
  - Innehåll: liten bild, `title`, `author`, `genres`, `published_year`
  - Klickbar länk till bokens detaljer
- **Bokdetaljer**
  - Innehåll: större bild, `title`, `author`, `published_year`, `description`, `genres`
  - Formulär för att lämna ny recension
  - Lista över alla recensioner tillhörande boken

---

## 🧪 Tekniker & Verktyg

- **Node.js** + **Express.js** (Backend)
- **MongoDB** + **Mongoose** (Databas)
- **JWT (JSON Web Token)** (Autentisering)
- **Insomnia** (Testa REST API:er)
- **HTML/CSS/JavaScript** (Frontend)

---

## 👥 Projektmedlemmar

| Namn                   | GitHub-länk                              |
|------------------------|-------------------------------------------|
| Marie Lenvik           | [github.com/angien90](https://github.com/angien90) |
| Vy Petersson           | [github.com/M-Lenvi](https://github.com/M-Lenvik) |
| Angelica Nylander      | [github.com/tgvie](https://github.com/tgvie) |

---

## 📌 Sammanfattning

Book API är ett webbaserat system som ger både administratörer och vanliga användare möjlighet att hantera ett digitalt bibliotek. Genom integration med MongoDB och ett rollbaserat skyddssystem kan projektet enkelt utökas med ytterligare funktioner såsom filtrering, sök eller rollstyrd tillgång.
