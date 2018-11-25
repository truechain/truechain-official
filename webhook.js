'use strict'
const http = require('http')
const createHandler = require('github-webhook-handler')
const { spawn } = require('child_process')
const handler = createHandler({
  path: '/webhook',
  secret: 'truechainSSR'
})

const runCommand = (cmd, args, callback) => {
  const child = spawn(cmd, args)
  let response = ''
  child.stdout.on('data', buffer => {
    response += buffer.toString()
  })
  child.stdout.on('end', () => callback(response))
}

http.createServer(function (req, res) {
  handler(req, res, function (err) {
    if (err) throw err
    res.statusCode = 404
    res.end('no such location')
  })
}).listen(7778)

handler.on('error', function (err) {
  console.error('Error:', err.message)
})

handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
  if (event.payload.ref === 'refs/heads/master') {
    console.log('Start run command')
    runCommand('sh', ['./deploy.sh'], txt => {
      console.log(txt)
    })
  } else {
    console.log('Not the master branch, will not trigger')
  }
})
