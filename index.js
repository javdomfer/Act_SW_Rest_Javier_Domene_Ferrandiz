// npm init -y
// npm install express method-override ejs dotenv

const express = require("express");
const app = express();
require("dotenv").config();
const port = process.env.PORT || process.env.PUERTO || 3010;
const msg = process.env.API_MENSAJE;
const path = require("path");
const methodOverride = require("method-override"); // Cambiar método de formulario
const swRoutes = require("./routes/sw.routes");

app.set("view engine", "ejs"); // Modelo para las vistas
app.set("views", path.join(__dirname, "/views")); // Carpeta para las vistas

app.use(express.static(path.join(__dirname, "public"))); // Carpeta pública
app.use(express.urlencoded({ extended: true })); // Para poder leer datos (request body) en métodos POST
app.use(express.json()); // Leer datos json
app.use(methodOverride("_method")); // ?_method=PATCH | ?_method=DELETE

// Ruta raíz

app.get("/", (req, res) => {
  res.redirect("search.html");
});

// Rutas fijas

app.use("/starwars", swRoutes);

// Página de error general

app.use((req, res) => {
  res.render("error.ejs", { msg: "404 - NOT FOUND" });
});

// Levantar servidor

app.listen(port, () => {
  console.log(`${msg}${port}`);
});
