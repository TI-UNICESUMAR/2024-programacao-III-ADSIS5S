const carrinho = [
    { nome: "Caneta", qtde: 20, preco: 2.50 },
    { nome: "Impressora", qtde: 2, preco: 750.99 },
    { nome: "Caderno", qtde: 10, preco: 15.50 },
    { nome: "Tesoura", qtde: 0, preco: 5.00 },
    { nome: "Tesoura", qtde: 0, preco: 5.00 },
    { nome: "Tesoura", qtde: 0, preco: 5.00 },
    { nome: "Tesoura", qtde: 0, preco: 5.00 },
]

const produtos = carrinho.map(item => item.nome)

console.log(produtos)

const valor_total = carrinho.map(item => {
    let por_produto = {
        ...item,
        valor: item.qtde * item.preco
    }
    return por_produto
})

//console.log(valor_total)


let numero = Math.floor(Math.random() * carrinho.length)

console.log(numero)