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
        var uv_index = 0;

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

        uv_index = current_uv.data.result.uv;
        var text = null;

        if ( uv_index < 3) {
            text = "Sunlight? More like flashlight. You can skip the sunscreen and chill.";
        }

        else if ( uv_index < 6 ) {
            text = "The sun’s warming up—might wanna slap on some sunscreen before you start sizzling.";
        }

        else if ( uv_index < 8 ) {
            text = "Whoa! The sun’s not playing—better sunscreen up or you’re toast.";
        }

        else if ( uv_index < 11 ) {
            text = "Hot dang! This sun’s auditioning for a BBQ. Wear sunscreen or you’re the main course!";
        }

        else {
            text = "You will get burn alive if you don't use the sunscreen!";
        }

        console.log(current_uv.data.result.uv);
    }

    res.render("index.ejs", { user_location: location, uv: uv_index, uv_text: text });

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