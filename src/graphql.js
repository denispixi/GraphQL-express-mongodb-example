// @ts-check
import { makeExecutableSchema } from 'graphql-tools'
import { tasks } from './samples'
import { User } from './models'
const gql = String.raw;

const typeDefs = gql`
  type Query {
    hello(name: String): String
    tasks: [Task]
    users: [User]
  }

  type Task {
    _id: ID!
    title: String!
    description: String!
    number: Int
  }

  type User {
    _id: ID!
    firstname: String!
    lastname: String!
    age: Int
  }

  type Mutation {
    createTask(input: TaskInput): Task
    createUser(input: UserInput): User
    updateUser(_id: ID, input: UserInput): User
    deleteUser(_id: ID): User
  }

  input TaskInput {
    title: String!
    description: String!
    number: Int
  }

  input UserInput  {
    firstname: String
    lastname: String
    age: Int
  }
`

const resolvers = {
  Query: {
    hello(root, args) {
      return `Hello ${args.name}`
    },
    tasks() {
      return tasks
    },
    async users() {
      return await User.find()
    }
  },

  Mutation: {
    createTask(root, { input }) {
      input._id = tasks.length
      tasks.push(input)
      return input
    },
    async createUser(root, { input }) {
      const newUser = new User(input)
      return await newUser.save()
    },
    async updateUser(root, { _id, input }) {
      return await User.findByIdAndUpdate(_id, input, { new: true })
    },
    async deleteUser(root, { _id }) {
      return await User.findByIdAndDelete(_id)
    }
  }
}

export const schema = makeExecutableSchema({ typeDefs, resolvers })