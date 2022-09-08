const axios = require("axios");
const { Temperaments } = require("../db");

const getTemperament = async () => {
   
    // console.log(temp.temperament)
    try {
         let api = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=df92bff6-480b-4939-94d9-d40dff68ed52`);
    let allTemperament = await api.data.map((temp) => {
         return temp.temperament
    }).join().split(",");

    let temps = [];

    allTemperament.map((c) => {
        if (!temps.includes(c.trim()) && c) {
            temps.push(c.trim());
        }
    });
    
    temps.map(async (d) => {
        await Temperaments.findOrCreate({
            where: {
                name: d
            },
        });
    });
    // console.log(temps)
    } catch (error) {
        console.log(error)
    }
   
};

module.exports = {
    getTemperament,
};