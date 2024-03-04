import { Alunos } from './Alunos.js'

async function main() {
    let alunos = new Alunos()

    alunos.writeAlunos()

    const readed = JSON.parse(await alunos.readAlunosDataSource())
    console.log('Listando alunos do arquivo', readed)
}

main()