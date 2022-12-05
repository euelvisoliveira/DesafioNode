const { request, response } = require('express')
const express = require('express')
const uuid = require('uuid')

const port = 3000
const app = express()
app.use(express.json())

const orders = []

app.get('/orders', (request, response) => {
  return response.json(orders)
})

app.post('/orders', (request, response) => {
  const { order, clientName, price } = request.body

  const orderss = {
    id: uuid.v4(),
    order,
    clientName,
    price,
    status: 'Em Preparação'
  }

  orders.push(orderss)

  return response.status(201).json(orderss)
})

app.put('/orders/:id', (request, response) => {
  const { id } = request.params
  const { order, clientName, price } = request.body

  const updatedStatus = { id, order, clientName, price, status: 'Em Preparção' }

  const index = orders.findIndex((order) => order.id === id)

  if (index < 0) {
    return response.status(404).json({ message: 'User not found' })
  }

  orders[index] = updatedStatus

  return response.json(orders)
})

app.delete('/orders/:id', (request, response) => {
  const { id } = request.params

  const index = orders.findIndex((order) => order.id === id)

  if (index < 0) {
    return response.status(404).json({ message: 'User not found' })
  }

  orders.splice(index, 1)

  return response.status(204).json(orders)
})

app.get('/orders/:id', (request, response) => {
  const { id } = request.params

  const index = orders.findIndex((order) => order.id === id)

  if (index < 0) {
    return response.status(404).json({ message: 'User not found' })
  }

  return response.json(orders[index])
})

app.path('/orders/:id', (request, response) => {
  const { id } = request.params

  const updatedStatus = { status: 'Pronto' }

  const index = orders.findIndex((order) => order.id === id)

  if (index < 0) {
    return response.status(404).json({ message: 'User not found' })
  }

  orders[index] = updatedStatus

  return response.json(orders)
})

app.listen(port, () => {
  console.log(`🚀 Serve started on port ${port}`)
})
