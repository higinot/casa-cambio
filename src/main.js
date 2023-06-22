import "./style.css";

const fetchMoeda = document.querySelector('input');
const fetchButton = document.querySelector('button');
const body = document.querySelector('body')


console.log(fetchMoeda.value)
const createCurrentDiv = (chave, valor) => {
    const div = document.createElement('div')
    const p = document.createElement('p')
    div.classList.add('componente')
    div.appendChild(p)

    p.innerText = `${chave}:`
    p.innerText += parseFloat(valor).toFixed(2)

    return div;
}
 
const createDiv = async (moeda, obj) => {
    const mainDiv = document.createElement('div')
    mainDiv.classList.add('centered-div')

    const mainText = document.createElement('h2')
    mainText.innerText = `Valores referentes a ${moeda}`

    body.appendChild(mainDiv)
    mainDiv.appendChild(mainText)

    const newDiv = document.createElement('div')
    newDiv.classList.add('group-componente')
    mainDiv.appendChild(newDiv)

    setFetch(obj, newDiv)
}

const setFetch = (obj, div) => {
    Object.entries(obj).forEach((coin) => {
        const [chave, valor] = coin;
        const nextDiv = createCurrentDiv(chave, valor)
        div.appendChild(nextDiv)
    })
}


const fetchData = (url) => fetch(url)
.then((responde) => responde.json())
.then((data) => {
    return data.rates
})
.catch((error) => {
    console.error("Ocorreu um erro", error);
})


fetchButton.addEventListener('click', async () => { 
    const div = document.getElementsByClassName('centered-div')
    if (div.length > 0) {
        div[0].remove()
    }

    

    const urlFetch = `https://api.exchangerate.host/latest?base=${fetchMoeda.value}`

    const data = await fetchData(urlFetch);
    console.log(data)
    createDiv(fetchMoeda.value, data)  
})
