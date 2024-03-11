import { Schema, model } from 'mongoose'

const bookSchema = new Schema({
    title: String,
    author: String,
    ISBN: String
}, {
    timestamps: true
})

export default model('Book', bookSchema)