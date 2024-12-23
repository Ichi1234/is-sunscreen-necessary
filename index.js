import express from "express";
import axios from "axios";


const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/", async (req, res) => {
    res.render("index.ejs", {
        user_latitude: null,
        user_longitude: null 
       });

});

app.post("/location", (req, res) => {
    const { latitude, longitude } = req.body;
    console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    res.render("index.ejs", {
         user_latitude: latitude,
         user_longitude: longitude 
        });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});