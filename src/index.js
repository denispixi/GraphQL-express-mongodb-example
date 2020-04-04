// @ts-check
import express from 'express'
import graphqlHTTP from 'express-graphql'
import { schema } from './graphql'
import { connect } from './db'
import dotenv from 'dotenv'
dotenv.config()
console.log(process.env.MONGODB_CONNECTION_STRING);

const app = express()

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema
}))

app.get('/', (req, res) => {
  res.json({ message: 'Hola mundo' })
})

async function initServer() {
  try {
    await connect()
    app.listen(3000, () => console.log('Server on port 3000'))
  } catch (error) {
    console.log('DB connection error!!:::', error)
  }
}
initServer()