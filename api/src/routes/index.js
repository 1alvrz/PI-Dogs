const { Router } = require('express');
const router = Router();

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {Dog, Temper} = require("../db.js");

const axios = require("axios");

const {API_KEY} = process.env;
const URL = `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`;

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/dogs", async (req, res) => {
    let {name} = req.query;
    const {data} = await axios(URL);
    const dogsAPI = [];
    data.map(
        (d) => {
            dogsAPI.push({
                id: d.id,
                name: d.name,
                life_span: d.life_span,
                temperament: d.temperament,
                image: d.image.url,
                weight: d.weight.metric.length > 2 ? d.weight.metric.split(" - ") : [d.weight.metric, d.weight.metric],
                height: d.height.metric.length > 2 ? d.height.metric.split(" - ") : [d.height.metric, d.height.metric],  //Devuelve como array las alturas
            })
        }
    )
    let allDogs = [];
    try {
        let dogsDb = await Dog.findAll({include: {model: Temper}});
        if(dogsDb.length) {
            dogsDb.map(
                (dog) => {
                    let t = [];
                    dog.tempers.map((te) => t.push(te.name))
                    let d = {
                        id: "db"+dog.id,
                        name: dog.name,
                        height: dog.height,
                        weight: dog.weight,
                        life_span: dog.years,
                        temperament: t.join(", "),
                        image: dog.image,
                    }
                    allDogs.push(d);
                }
            );
        }
        allDogs = allDogs.concat(dogsAPI);
        if(name){
            allDogs = allDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
            if(!allDogs.length) allDogs = ["Not Found"]
        };
        res.status(200).send(allDogs);
    } catch (error) {
        console.log(error);
    }    
});

router.get("/dogs/:idRaza", async (req, res) => {
    let {idRaza} = req.params;
    try {
        if(idRaza.includes("db")){
            idRaza = parseInt(idRaza.slice(2));
            var dog = await Dog.findByPk(idRaza, {include: {model: Temper}});
            console.log(dog);
            const temp = [];
            dog.tempers.map((t) => temp.push(t.name));
            var dogById = {
                name: dog.name,
                weight: dog.weight.join(" - "),
                height: dog.height.join(" - "),
                temperament: temp.join(", "),
                life_span: dog.years,
                image: dog.image,
            }
        }else{
            const {data} = await axios.get(URL);
            const dog = data.find(d => d.id === parseInt(idRaza));
            var dogById = {
                name: dog.name,
                weight: dog.weight.metric.toString(),
                height: dog.height.metric.toString(),
                temperament: dog.temperament,
                life_span: dog.life_span,
                image: dog.image.url,
            }
        }
        
        if(!dogById) return res.status(404).send("No encontrado");
        res.send(dogById);
    } catch (error) {
        console.log(error);
    }
});

router.post("/dogs", async (req, res) => {
    const {name, height, weight, years, temp} = req.body;
    try {
        const dog = await Dog.create(req.body);
        for(let i = 0; i < temp.length; i++){
            const tempe = await Temper.findOne({where: {"name": temp[i]}})
            dog.addTempers([tempe]);
        }
        res.status(200).json({a:"Se agregó exitosamente: ",dog});
    } catch (error) {}
});

router.get("/temperaments", async (req, res) => {
    try {
        let temperaments = await Temper.findAll();
        if(temperaments.length){
            let tempDb = [];
            temperaments.map(
                (t) => {
                    tempDb.push(t.name);
                }
            );
            tempDb.sort();
            return res.send(tempDb);
        }
        
        let {data} = await axios(URL);
        let tempApi = [];
        data?.map(
            (d) => {
                if(d.temperament){
                    let t = d.temperament.split(",");
                    t = t.map(a => a.trim());
                    t.map(
                        (a) => {
                            if(!tempApi.includes(a)) tempApi.push(a);
                        }
                    )
                }
            }
        )
        for(let i = 0; i < tempApi.length; i++){
            let p = await Temper.create({"name":tempApi[i]})
        }
        tempApi.sort();
        return res.send(tempApi);
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
