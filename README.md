  ## Indice

  * [Introducción](#intro)
  * [Instalación](#instal)
  * [EndPoints & Respuestas](#endpoints)

  ## <a name="intro"></a>Introducción
  <p>
  DgtScrapper es una API cuyo objetivo es aportar una solución con la que las autoescuelas españolas puedan acceder a los reultados de los examenes de tráfico
  oficiales desde sus propias páginas web.
  </p>
  
  <p>
  Actualmente la DGT no ofrece ningún tipo de API o acceso rápido a esto datos. La solución ideada es un Bot Scrapper que accede a la web oficial de la DGT, recopila
  los datos y nos lo devuelve en formato JSON
  </p>

  ## <a name="instal"></a>Instalación
  <p>
  Para montar esta API debemos tener instalado NodeJS. Simplemente clonar e instalar las dependencias
  </p> 
  
  ```sh
  npm install
  ```

  ## <a name="endpoints"></a>EndPoints & Respuestas

  ### `POST`

  #### Ejecuta el scrapper con los parametros dados
  <p>
  Los parámetros obligatorios son:

  (estos datos deben entrar con el formato `application/x-www-form-urlencoded`)
  </p>
  
  <ul>
    <li>nifNie   => DNI del alumno</li>
    <li>fechaEx  => Fecha de realización de exámen</li>
    <li>fechaNac => Fecha de nacimiento del alumno</li>
    <li>licencia => Letra de la licencia al que se presento Eg: B1, A...</li>
  </ul>
   

  #### `/scrap`

  ### Sample response:
      //Si se encuentran datos y son correctos
      {
        "resultado": "APTO",
        "clavesEliminatorias": [],
        "clavesDeficients": [],
        "clavesLeves": [
            "13.1.5",
            "13.2.2"
        ]
      }
      
      //Si no se encuentran datos o no son correctos (Status code: 460)
      {
        "message": "No se pudo encontrar el examen con los datos introducidos"
      }
