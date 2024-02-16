import fastify from 'fastify'
import { knex } from './database'
import { env } from './env'

const app = fastify()

app.get('/hello', async () => {
  const transactions = await knex('transactions').select('*')
  return transactions
})

app.get('/hello2', async () => {
  const transactions = await knex('transactions')
    .where('amount', 1000)
    .select('*')
  return transactions
})

app.get('/hello3', async () => {
  const transaction = await knex('transactions')
    .insert({
      id: crypto.randomUUID(),
      title: 'Transação de teste',
      amount: 1000,
    })
    .returning('*')

  return transaction
})

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log('HTTP server running')
  })
