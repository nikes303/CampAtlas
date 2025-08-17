const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const randomIndex = Math.floor(Math.random() * cities.length);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //YOUR USER ID
      author: "5f5c330c2cd79d538f2c66d9",
      location: `${cities[randomIndex].city}, ${cities[randomIndex].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      description:
        "A beautiful and serene campsite perfect for a weekend getaway. Enjoy the lush greenery and stunning views of the nearby mountains and rivers. Great for trekking and bonfires!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[randomIndex].longitude,
          cities[randomIndex].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/CampAtlas/ahfnenvca4tha00h2ubt.png",
          filename: "CampAtlas/ahfnenvca4tha00h2ubt",
        },
        {
          url: "https://res.cloudinary.com/douqbebwk/image/upload/v1600060601/CampAtlas/ruyoaxgf72nzpi4y6cdi.png",
          filename: "CampAtlas/ruyoaxgf72nzpi4y6cdi",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
