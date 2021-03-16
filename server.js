/*
*
* Fonte:  Diego Fernandes - https://www.youtube.com/watch?v=-jXfKDYJJvo&t=8s
*
* Autor: Tiago Morais
* Chat com socket.io
 */

const express = require('express');
const path = require('path');

/* Sistema de rotas do nodejs */
const app = express();

/* http permitirá o acesso ao servidor pelo Http como um site */
const server = require('http').createServer(app);

/* Socket IO é o responsável por gerenciar as conexões via Socket */
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname,'public')));

/* Define a pasta onde as views estão salvas */
app.set('views',path.join(__dirname,'public'));

/* EJS é um programa para layout padronizado, assim como o BLADE para o Laravel */
app.engine('html', require('ejs').renderFile);

/* Define a engine como html */
app.set('view engine', 'html');

/* ROTAS */

app.use('/', function(req, res){
  res.render('index.html');
});

/* END ROTAS */


/* SOCKET  */

var messages=[];
    /* Ao se conectar */
io.on('connection', function (socket) {


    console.log('Socket Conectado: '+ socket.id);


/* Ao se conectar o novo usuário recebe todas as mensagens anteriores através do evento prevMessages */
    socket.emit('prevMessages',messages);

/* Quando o servidor recebe uma mensagem, ele imprime a mensagem no console, armazena no array de mensagens e dispara em broadcast a mensagem para todos os clientes */
socket.on('sendMessage', function(data) {
    console.log(data);
    messages.push(data);
    socket.broadcast.emit('recivedMessage',data);
});



});




/* END SOCKET */



/* Inicia o servidor escutando a porta 3000 http */
server.listen(3000);