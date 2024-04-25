const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
  console.log("Database connected.");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: "6620ffd133811ed743bb0b99",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      images: [
        {
          url: "https://res.cloudinary.com/dke61jwv5/image/upload/v1713528047/YelpCamp/jbabsjvzmhcods881ipb.jpg",
          filename: "YelpCamp/jbabsjvzmhcods881ipb",
        },
        {
          url: "https://res.cloudinary.com/dke61jwv5/image/upload/v1713528047/YelpCamp/tq3xn9kj24iz8hn0pmsv.jpg",
          filename: "YelpCamp/tq3xn9kj24iz8hn0pmsv",
        },
      ],
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto quisquam distinctio eos. Obcaecati voluptatem voluptatibus explicabo aliquid, sunt vero nesciunt corporis quo optio nam, unde fugiat ut veniam non voluptate?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
