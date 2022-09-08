//const { API_KEY } = process.env
const axios = require("axios");
const { Dogs, Temperaments } = require("../db");


const getApiInfo = async () => {
  try {
    const api = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=df92bff6-480b-4939-94d9-d40dff68ed52`
    );

    const dogInfo = await api.data.map((d) => {
      const weightMM = [];
      d.weight.metric.split("-")?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }
      // console.log(d.temperament);
      return {
        id: d.id,
        name: d.name,
        weight: weightMM,
        image: d.image.url,
        temperament: d.temperament,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDBinfo = async () => {
  try {
    const dogInDB = await Dogs.findAll({
      include: {
        model: Temperaments,
        // attributes: ["name"],
        // through: {
        //   attributes: [],
        // },
      },
    });
    console.log(dogInDB)

    const dogInfo = dogInDB.map((d) => {
      const weightMM = [];
      d.weight.split("-")?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }

      return {
        id: d.id,
        name: d.name,
        weight: weightMM,
        image: d.image,
        temperament: d.Temperaments?.reduce((acm,cur) => {
         acm += cur.name + "," 
         return acm
        },""),
        createdAtDb: d.createdAtDb,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getAllDogs = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDBinfo();
  const allInfo = apiInfo.concat(dbInfo);

  return allInfo;
};

const getDetailsApiInfo = async () => {
  try {
    const api = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=df92bff6-480b-4939-94d9-d40dff68ed52`
    );

    const dogInfo =  api.data.map((d) => {
      const heightMM = [];
      d.height.metric.split("-")?.forEach((element) => {
        heightMM.push(parseInt(element.trim()));
      });
      if (!heightMM[1]) {
        heightMM.push(heightMM[0]);
      }

      const weightMM = [];
      d.weight.metric.split("-")?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }

      const life_SpanAA = [];
      d.life_span.split("-")?.forEach((element) => {
        life_SpanAA.push(parseInt(element.trim()));
      });
      if (!life_SpanAA[1]) {
        life_SpanAA.push(life_SpanAA[0]);
      }

      return {
        id: d.id,
        name: d.name,
        height: heightMM,
        weight: weightMM,
        lifeSpan: life_SpanAA,
        image: d.image.url,
        temperament: d.temperament,
        origin: d.origin,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDetailsDBinfo = async () => {
  try {
    const dogInDB = await Dogs.findAll({
      include: {
        model: Temperaments,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    });

    const dogInfo = await dogInDB.map((d) => {
      const heightMM = [];
      d.height.split("-")?.forEach((element) => {
        heightMM.push(parseInt(element.trim()));
      });
      if (!heightMM[1]) {
        heightMM.push(heightMM[0]);
      }

      const weightMM = [];
      d.weight.split("-")?.forEach((element) => {
        weightMM.push(parseInt(element.trim()));
      });
      if (!weightMM[1]) {
        weightMM.push(weightMM[0]);
      }

      const life_SpanAA = [];
      d.life_span.split("-")?.forEach((element) => {
        life_SpanAA.push(parseInt(element.trim()));
      });

      return {
        id: d.id,
        name: d.name,
        height: heightMM,
        weight: weightMM,
        lifeSpan: life_SpanAA,
        image: d.image,
        temperament:  d.Temperaments?.reduce((acm,cur) => {
          acm += cur.name + "," 
          return acm
         },""),
        createdAtDb: d.createdAtDb,
      };
    });

    return dogInfo;
  } catch (error) {
    console.log(error);
  }
};

const getDetailsDogs = async () => {
  try {
    const apiInfo = await getDetailsApiInfo();
    const dbInfo = await getDetailsDBinfo();
     console.log(dbInfo)
    const allInfo = apiInfo.concat(dbInfo);
   

    return allInfo;
  } catch (error) {
    console.log(error);
  }
};


module.exports = {
  getAllDogs,
  getDetailsDogs,
};
