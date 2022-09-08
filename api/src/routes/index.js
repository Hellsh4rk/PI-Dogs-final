require("dotenv").config();
const { Router } = require("express");
const { Dogs, Temperaments } = require("../db");
const { getAllDogs, getDetailsDogs} = require("../Controller/dogs");
const { getTemperament } = require("../Controller/temperament");
const db = require("../db");
const router = Router();



router.get("/dogs", async function (req, res) {
    const { name } = req.query;
    const dogTotal = await getAllDogs();
    try {
         if (name) {
        const dogName = dogTotal.filter(d => d.name.toLowerCase().includes(name.toLowerCase()));
        dogName.length ? res.status(200).send(dogName) : res.status(400).send("no se encontro el perro");
    } else {
        res.status(200).send(dogTotal);
    }
    } catch (error) {
        console.log(error)
    }
})


router.get("/dogs/:id", async (req, res) => { 
    try {
          const { id } = req.params;
    const allDogs = await getDetailsDogs();

    if (id) {
        let dogId = await allDogs.filter((obj) => obj.id == id);
        dogId.length
        ? res.status(200).send(dogId)
        : res.status(404).send("Perro no encontrado");
    }
    } catch (error) {
        console.log(error)
    }
  
});


router.get("/temperament", async (req, res) => {
    try {
          await getTemperament();

    const allTemperaments = await Temperaments.findAll();
    // const filteredTemperaments = await allTemperaments.map((obj) => obj.name);
    res.status(200).send(allTemperaments);
    } catch (error) {
        console.log(error)
    }
  
});



router.post("/dogs", async (req, res) => { 
    try {
         let {
        name,
        minimHeight,
        maximHeight,
        minimWeight,
        maximWeight,
        minLifeSpan,
        maxLifeSpan,
        image,
        temperament,
    } = req.body;
    console.log(req.body)
    

    let height = minimHeight + " - " + maximHeight
    let weight = minimWeight + " - " + maximWeight
    let life_span = minLifeSpan + " - " + maxLifeSpan
    console.log(minimHeight)
    let dog = await Dogs.create({
        name,
        height,
        weight,
        life_span,
        image: image ? image : "https://i.pinimg.com/564x/1c/77/72/1c7772ea29c8778cbfd2af041a8fc948.jpg",
        
    });

    await dog.addTemperaments(temperament)
  
     res.json(dog)
    } catch (error) {
        console.log(error)
    }
   
});

module.exports = router;
