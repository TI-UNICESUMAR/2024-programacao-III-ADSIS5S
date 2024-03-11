const fs = require('fs/promises');
const { jsPDF } = require("jspdf");
const { createCanvas, loadImage } = require('canvas');
const docPdf = new jsPDF({
    format: "a7",
    unit: 'pt',
    orientation: 'p',
});

async function escreverArquivoCallback(nomeArquivo, dados) {
    console.log(`Escrevendo dados no arquivo ${nomeArquivo}...`)
    await fs.writeFile(nomeArquivo, dados)
}

async function lerArquivoCallback(nomeArquivo,) {
    console.log(`Lendo dados do arquivo: ${nomeArquivo}`)
    const read = await fs.readFile(nomeArquivo, 'utf-8')
    return read
}

async function addImagemPDF(pdf, imagemUrl, x, y, width, height) {
    try {
        const image = await loadImage(imagemUrl);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0, image.width, image.height);
        const imageDataUri = canvas.toDataURL('image/png');
        pdf.addImage(imageDataUri, 'PNG', x, y, width, height);
    } catch (error) {
        console.error('Erro ao carregar a imagem:', error);
    }
}

async function escreverPDF(nomeArquivo, dados, urlImagem) {
    const left = 15;
    const top = 10;
    const imgWidth = 200;
    const imgHeight = 200;
    await addImagemPDF(docPdf, urlImagem, left, top, imgWidth, imgHeight);
    const textTop = top + imgHeight + 10; 
    docPdf.setFontSize(14);
    docPdf.text(`Pokemon: ${dados.nome}`, left , textTop);
    docPdf.text(`Id: ${dados.id}`, left , textTop + 16);
    const tipos = dados.tipos.join(', ');
    docPdf.text(`Tipos: ${tipos}`, left, textTop + 32);
    docPdf.text(`Peso: ${dados.peso}`, left , textTop + 48);
    docPdf.text(`Altura: ${dados.altura}`, left , textTop + 64);

    const pdfData = docPdf.output();
    fs.writeFile(nomeArquivo, pdfData, 'binary');
    console.log('PDF salvo com sucesso!');
}

function escreverNovaPagina(docPdf) {
    docPdf.addPage(); // Adiciona uma nova página ao documento PDF
}

var i = 1
async function getPokemonDataWithCallbacks() {
    try {
        var pokeArray = [];
        while (i !== 13) {

            console.log("Aguardando retorno da Poke API" + i)
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`)
            const body = await response.json()
            const PokemonInfo = {
                id: body.id,
                nome: body.name,
                tipos: body.types.map(type => type.type.name),
                peso: body.weight,
                altura: body.height,
                sprites: body.sprites.front_default
            }
            pokeArray.push(PokemonInfo);
            // console.log(pokeArray);
            i++
        }
        PokemonData = JSON.stringify(pokeArray, null, 2)
        await escreverArquivoCallback('Pokemon.json', PokemonData);
        await escreverArquivoCallback('dados.txt', PokemonData);

        for (const element of pokeArray) {
    await escreverPDF("Pokemon.pdf", element, element.sprites, docPdf);
    if (pokeArray.indexOf(element) !== pokeArray.length - 1) {
        escreverNovaPagina(docPdf);
    }
}
        let readData = await lerArquivoCallback('dados.txt')
        console.log('lendo Txt \n' + readData)
        readData = await lerArquivoCallback('Pokemon.json')
        console.log('lendo json \n' + readData)
    } catch (error) {
        console.error("Erro ao obter dados do Pokemon", error)
    }
}

getPokemonDataWithCallbacks();