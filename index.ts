import express from 'express'
import bodyParser from 'body-parser'
import * as CONST from './Services/constants'
import { Scrapper } from './Classes/Scrapper'
import { Resultados } from './Interfaces/Resultados'

const APP:express.Application = express()
APP.use(bodyParser.urlencoded({extended: true}))

APP.post('/scrap', async (req, res) => {

    let nifNie = req.body.nifNie
    let fechaEx = req.body.fechaEx
    let fechaNac = req.body.fechaNac
    let licencia = req.body.licencia
    let resultados:Resultados =  {} as Resultados

    
    const scrap = new Scrapper(nifNie, fechaEx, fechaNac, licencia);

    try {

        await scrap.generateResultados()
        resultados = scrap.getResultados()
        res.send(resultados)

    } catch (e) {

        res.status(404).send({message: "No se pudo encontrar el exámen con los datos introducidos"})

    }
})

APP.listen(CONST.PORT, () => {
    console.log(`Server is alive & runnig at port ${CONST.PORT}`)
})