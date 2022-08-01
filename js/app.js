const grigliaElement = document.querySelector('.container_griglia');
const buttonElement = document.querySelector('.bottone_play');
buttonElement.addEventListener('click', creaGriglia)
const difficoltaElement = document.querySelector('select[name="bottone_difficolta"]')
const divPunteggio = document.querySelector('.punteggio')

let posizioniBombe = []
let punteggio = 0


function creaGriglia() {
    resetGame()
    const difficoltaSelezionata = difficoltaElement.value
    let dimensione = calcoloDimensioneGriglia(difficoltaSelezionata)
    const numeroCelle = dimensione ** 2 // al quadrato

    posizioniBombe = creaBomba()
    console.log('Bombe:', posizioniBombe)
    
    for(let i = 0; i < numeroCelle; i++) {        
        const cella = creaCella();
        cella.style.flexBasis = `${100 / dimensione}%`

        cella.innerHTML = i + 1;
        grigliaElement.append(cella);                
    }
}

function calcoloDimensioneGriglia(difficolta) {
    let dimensione = 10
    if (difficolta === "intermedio") {
        dimensione = 9
    }
    else if (difficolta === "difficile"){
        dimensione = 7        
    }
    return dimensione
}

function creaCella() {
    const divCella = document.createElement('div');
    divCella.classList.add('cella');
    divCella.addEventListener('click', gestoreClick)
    return divCella;
}

function gestoreClick() {
    const numeroCella = parseInt(this.innerHTML)
    this.classList.add('active')
    console.log(numeroCella)
    this.removeEventListener('click', gestoreClick)

    if(posizioniBombe.includes(numeroCella)) {
        this.classList.add('bomba')
        gameOver()
    }
    else {       
        punteggio++    
    }
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

function creaBomba() {
    const bombe = []
    while(bombe.length < 16) {
        const n = getRandomIntInclusive(1, 100)
        if(!bombe.includes(n)){
            bombe.push(n)
        }
    }  
    return bombe    
}

function resetGame () {
    grigliaElement.innerHTML = '';
    divPunteggio.innerHTML = '';
    punteggio = 0;
}

function gameOver () {
    divPunteggio.append('GAME OVER - Il tuo punteggio è di: ', punteggio)
    const celle = document.querySelectorAll('.cella')
    for( let i = 0; i < celle.length; i++) {
        const cella = celle[i]
        cella.removeEventListener('click', gestoreClick)
    }
}
