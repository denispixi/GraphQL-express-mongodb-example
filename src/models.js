import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: String,
  age: Number,
})

export const User = model('User', userSchema)