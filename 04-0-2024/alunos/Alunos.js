import { writeFile, readFile } from 'fs/promises'
import { alunos } from './alunosData.js'


export class Alunos {
    #dataSource = alunos

    getDataSource() {
        return this.#dataSource
    }

    writeAlunos() {
        try {
            writeFile('alunosDataSource.json', JSON.stringify(this.#dataSource, null, 2))
        } catch (error) {
            console.error('erro na hora de escrever o arquivo', err)
        }
    }

    async readAlunosDataSource() {
        const readAlunos = readFile('alunosDataSource.json', 'utf-8')
        return readAlunos
    }
}