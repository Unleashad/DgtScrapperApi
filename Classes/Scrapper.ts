import * as pupeteer from 'puppeteer';
import { Resultados } from '../Interfaces/Resultados';

export class Scrapper{

    private _nifNie:string;
    private _fechaExamen:string;
    private _fechaNacimiento:string;
    private _licencia:string;
    private _resultados:Resultados = {} as Resultados

    constructor(nn:string, fe:string, fn:string, lc:string) {
        
        this._nifNie = nn
        this._fechaExamen = fe
        this._fechaNacimiento = fn
        this._licencia = lc

    }

    getResultados():Resultados{
        return this._resultados;
    }

    async generateResultados(){

        let claElim
        let claDefi
        let claLeve
        let res:Resultados
    
        const browser = await pupeteer.launch()
        const page = await browser.newPage()
        await page.goto('https://sedeclave.dgt.gob.es/WEB_NOTP_CONSULTA/consultaNota.faces')
        await page.setViewport({
            width: 1920,
            height: 1080
        })
    
        let nifnie = await page.$("#formularioBusquedaNotas\\:nifnie")
        await nifnie!.type(this._nifNie)
    
        let fechaEx = await page.$("#formularioBusquedaNotas\\:fechaExamen")
        await fechaEx!.type(this._fechaExamen)
    
        await page.select('select[name=formularioBusquedaNotas\\:clasepermiso]', this._licencia)
    
        let fechaNac = await page.$("#formularioBusquedaNotas\\:fechaNacimiento")
        await fechaNac!.type(this._fechaNacimiento)
    
        await page.click('#formularioBusquedaNotas\\:j_id50 > input:nth-child(2)')
    
        await page.waitForNavigation()

    
        let resEx = await page.$eval("#formularioResultadoNotas\\:j_id38\\:0\\:j_id70", res => res.textContent)
    
        await page.$eval("#formularioResultadoNotas\\:j_id38\\:0\\:j_id125\\:0\\:j_id137 > td:nth-child(1)", res => res.textContent).then( (res) => { claElim = this.splitResults(res || "") })
        await page.$eval("#formularioResultadoNotas\\:j_id38\\:0\\:j_id125\\:0\\:j_id137 > td:nth-child(2)", res => res.textContent).then( (res) => { claDefi = this.splitResults(res || "") })
        await page.$eval("#formularioResultadoNotas\\:j_id38\\:0\\:j_id125\\:0\\:j_id137 > td:nth-child(3)", res => res.textContent).then( (res) => { claLeve = this.splitResults(res || "") })

        res = {
            resultado: resEx || "",
            clavesEliminatorias: claElim || [],
            clavesDeficients: claDefi || [],
            clavesLeves: claLeve || []
        }

        this._resultados = res
    
        await browser.close()

    }

    private splitResults(r:string):string[]{

        if(r == '0') return []
    
        let arrRes = r.split("-");
    
        arrRes.forEach((clave, index) => {
    
            arrRes[index] = clave.trim()
    
        });
    
        return arrRes;
    }
}