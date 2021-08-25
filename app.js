const express = require('express');
const bodyParser = require('body-parser');
const socket = require('socket.io')

const app = express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('public'));
app.set('view engine', 'ejs');
var port = process.env.PORT || 3000;

//Render Index page
app.get('/', (req, res) => {
    res.render('index')
})
app.get('/room', (req,res)=>{
    res.render('room')
})
app.post('/room',(req,res)=>{
    username= req.body.username;
    roomname= req.body.roomname;
    res.redirect(`/room?username=${username}&roomname=${roomname}`)
})
//Start Server
const server = app.listen(port, () => {
    console.log(`Server Running on port ${port}`)
})
const io = socket(server);
require('./util/socket')(io);