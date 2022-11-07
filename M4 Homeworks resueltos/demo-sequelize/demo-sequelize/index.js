const server = require('./src/app')
const { db } = require('./src/db')

server.listen('3001', async () => {
    console.log('Server listening on port 3001');
    await db.sync()
    await db.sync({ force: true })
})