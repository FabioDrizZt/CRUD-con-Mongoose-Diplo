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

### `find`

- **Descripción:** Busca documentos que cumplan con un criterio especificado.
- **Uso:** `Movie.find(query)`

### `findById`

- **Descripción:** Busca un documento por su ID.
- **Uso:** `Movie.findById(id)`

### `save`

- **Descripción:** Guarda un nuevo documento en la base de datos.
- **Uso:** `newMovie.save()`

### `findByIdAndUpdate`

- **Descripción:** Busca un documento por su ID y lo actualiza con los datos proporcionados.
- **Uso:** `Movie.findByIdAndUpdate(id, newData, options)`

### `findByIdAndDelete`

- **Descripción:** Busca un documento por su ID y lo elimina de la base de datos.
- **Uso:** `Movie.findByIdAndDelete(id)`

### comparativa entre el uso directo del driver de MongoDB y el uso de Mongoose como ODM (Object-Document Mapper)

| Característica                            | Uso directo del driver de MongoDB                                                     | Mongoose ODM                                                                                               |
| ----------------------------------------- | ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| Abstracción de la capa de modelo          | Requiere definir manualmente los esquemas y modelos de los documentos                 | Ofrece esquemas y modelos para definir la estructura de los documentos de forma sencilla                   |
| Gestión de la conexión a la base de datos | Necesita manejar la conexión y desconexión de manera explícita                        | Mongoose maneja la conexión automáticamente y la gestiona internamente                                     |
| Validación de datos                       | No incluye validación de datos en los esquemas                                        | Ofrece validación de datos integrada en los esquemas                                                       |
| Construcción de consultas                 | Las consultas deben construirse manualmente con el driver                             | Proporciona métodos para construir consultas de manera más sencilla y legible                              |
| Middleware                                | No incluye middleware para ejecutar código antes o después de ciertas operaciones     | Permite usar middleware para ejecutar código antes o después de operaciones como guardar, actualizar, etc. |
| Promesas y async/await                    | Utiliza callbacks, lo que puede llevar a un código más complejo y difícil de mantener | Ofrece soporte para promesas y async/await, lo que facilita la escritura de código asincrónico             |
| Gestión de transacciones                  | Requiere manejar las transacciones manualmente con el driver                          | Proporciona métodos para gestionar transacciones de forma más sencilla                                     |
