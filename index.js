import express from "express";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    var location = null;

    if (req.query.latitude && req.query.longitude) {
        location = { latitude: req.query.latitude, longitude: req.query.longitude };
    }

    res.render("index.ejs", { user_location: location });

    console.log(location);
});

app.post("/location", (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    res.redirect(`/?latitude=${encodeURIComponent(latitude)}&longitude=${encodeURIComponent(longitude)}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});