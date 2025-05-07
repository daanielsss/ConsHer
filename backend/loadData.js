require("dotenv").config(); // Para cargar las variables de entorno
const mongoose = require("mongoose");
const fs = require("fs"); // Para leer el archivo JSON
const path = require("path");

// Modelo para los productos
const restaurantSchema = new mongoose.Schema({
  user: String,
  restauranteName: String,
  city: String,
  country: String,
  deliveryPrice: Number,
  estimatedDeliveryTime: Number,
  cuisines: [String],
  menuItems: [
    {
      name: String,
      price: Number,
      _id: mongoose.Schema.Types.ObjectId,
    },
  ],
  imageUrl: String,
  lastUpdated: Date,
});

const Restaurant = mongoose.model("Restaurant", restaurantSchema);

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECTION_STRING);
    console.log("Conectado a MongoDB Atlas");
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    process.exit(1);
  }
};

const transformData = (data) => {
  return data.map((restaurant) => {
    // Convertir lastUpdated
    if (restaurant.lastUpdated && restaurant.lastUpdated.$date) {
      restaurant.lastUpdated = new Date(restaurant.lastUpdated.$date);
    }

    // Convertir _id de cada menuItem
    if (restaurant.menuItems && Array.isArray(restaurant.menuItems)) {
      restaurant.menuItems = restaurant.menuItems.map((item) => ({
        ...item,
        _id: new mongoose.Types.ObjectId(item._id.$oid),
      }));
    }

    return restaurant;
  });
};

const loadData = async () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, "FoodBase.json"), "utf8");
    const jsonData = JSON.parse(data);

    const transformedData = transformData(jsonData);

    await Restaurant.insertMany(transformedData);
    console.log("Datos cargados con éxito");
  } catch (error) {
    console.error("Error al cargar los datos:", error);
  }
};

// Ejecutar la carga de datos
const main = async () => {
  await connectToDB();
  await loadData();
  mongoose.connection.close();
};

main();
