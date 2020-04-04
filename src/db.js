// @ts-check
import mongoose from 'mongoose'

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGODB_CONNECTION_STRING, { useNewUrlParser: true })
    console.log('DB is connected')
  } catch (error) {
    console.log('Something went wrong', error)
  }
}
