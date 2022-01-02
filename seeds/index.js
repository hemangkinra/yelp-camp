const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '61c8c2b6869532e195ca6a0d',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dnmetviez/image/upload/v1641117292/YelpCamp/jose-ignacio-pompe-kLGnN8AlEZc-unsplash_ke3is1.jpg',
                    filename: 'YelpCamp/jose-ignacio-pompe-kLGnN8AlEZc-unsplash_ke3is1'
                },
                {
                    url: 'https://res.cloudinary.com/dnmetviez/image/upload/v1641117277/YelpCamp/harrison-steen-N6xp_7BGxC8-unsplash_ddnptq.jpg',
                    filename: 'YelpCamp/harrison-steen-N6xp_7BGxC8-unsplash_ddnptq'
                },
                {
                    url: 'https://res.cloudinary.com/dnmetviez/image/upload/v1641117278/YelpCamp/leandra-rieger-pTZqeyzQJao-unsplash_sjqsli.jpg',
                    filename: 'YelpCamp/leandra-rieger-pTZqeyzQJao-unsplash_sjqsli'
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})