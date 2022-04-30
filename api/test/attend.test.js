const supertest = require('supertest');
const {server, connectionServer} = require('../index')

const api = supertest(server)

test('Las provincias deben ser retornadas en formato JSON', async () => {
  await api
    .get('api/provincias/ar')
    .expect(400)
    .expect('Content-Type', /application\/json/)
})

afterAll(()=>{
  connectionServer.close()
})