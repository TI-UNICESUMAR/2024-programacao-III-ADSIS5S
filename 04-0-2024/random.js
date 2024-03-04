// dado um array de objetos, vamos retornar um novo array
// O arrau original deve ter pelo menos 5 elementos
// O novo array deve ter apenas 3 elementos, porém, escolhidos de forma aleatória

// Dica: pesquise como usar o includes em seu array


const produtos = [
    { nome: "Caneta", qtde: 20, preco: 2.50 },
    { nome: "Impressora", qtde: 2, preco: 750.99 },
    { nome: "Caderno", qtde: 10, preco: 15.50 },
    { nome: "Tesoura", qtde: 0, preco: 5.00 },
    { nome: "Tenis", qtde: 1, preco: 655.00 },
    { nome: "Celular", qtde: 10, preco: 7000.00 },
    { nome: "Mouse", qtde: 8, preco: 62.00 },
    { nome: "Teclado", qtde: 7, preco: 50.00 },
]


function getRandomValuesFromArray(array, randomQuantity) {
    if (randomQuantity > array.length) return "Quantidade de itens aleatórios é maior que o tamanho do array"
    let randomProducts = []

    while (randomProducts.length < randomQuantity) {
        let randomNumber = Math.floor(Math.random() * array.length)
        if (!randomProducts.includes(array[randomNumber])) {
            randomProducts.push(array[randomNumber])
        }
    }

    return randomProducts
}

console.log(getRandomValuesFromArray(produtos, 5))