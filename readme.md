# Tutorial de Métodos de Mongoose

En este tutorial, se explican los métodos de Mongoose utilizados en una API básica de películas. Estos métodos permiten realizar operaciones CRUD (Crear, Leer, Actualizar, Borrar) en una base de datos MongoDB.

## Métodos Utilizados

### `connect`
- **Descripción:** Establece la conexión con la base de datos MongoDB.
- **Uso:** `mongoose.connect(MONGO_URI/DATABASE, options)`

### `Schema`
- **Descripción:** Define la estructura de los documentos en la colección.
- **Uso:** `const movieSchema = new mongoose.Schema({ ... })`

### `Model`
- **Descripción:** Crea un modelo basado en un esquema que se puede usar para realizar operaciones en la colección.
- **Uso:** `const Movie = mongoose.model('Movie', movieSchema)`