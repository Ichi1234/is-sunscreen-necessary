import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    var location = null;
    var current_uv = null;

    if (req.query.latitude && req.query.longitude) {
        const latitude = req.query.latitude;
        const longitude = req.query.longitude;

        location = { latitude: req.query.latitude, longitude: req.query.longitude };
        current_uv = await axios.get("https://api.openuv.io/api/v1/uv", {
            params: {
                lat: latitude,
                lng: longitude 
            },
            headers: {
                "x-access-token": process.env.OPENUV_API_KEY
            }
        });
        

        console.log(current_uv.data.result.uv);
    }

    res.render("index.ejs", { user_location: location, uv: current_uv });

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