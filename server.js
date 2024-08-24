let express = require('express');
let app = express();
let ejs = require('ejs');
let socket = require('socket.io');
let cors = require('cors');

let {initializeApp} = require('firebase/app')
let {getDatabase,ref,onValue} = require('firebase/database')

const firebaseConfig = {
    apiKey: "AIzaSyBP0-AqMw14NaluT4XGQOU1f4Mw99xcID4",
    authDomain: "i-media-2fe0e.firebaseapp.com",
    databaseURL: "https://i-media-2fe0e-default-rtdb.firebaseio.com",
    projectId: "i-media-2fe0e",
    storageBucket: "i-media-2fe0e.appspot.com",
    messagingSenderId: "686405947489",
    appId: "1:686405947489:web:2dd2ba13c8b0a8afb6da20"
  };

let divice = require('node-device-detector');

app.set('view engine','ejs');

//who can use my api 
app.use(cors({
    origin:'*'
}))

app.get('/login',(req,res)=>{
    res.render('createacc/login')
})

app.get('/',(req,res)=>{
    res.render('main')
})
app.get('/profile',(req,res)=>{
    res.render('profile/profile')
})

app.get('/add-posts',(req,res)=>{
    res.render('add-posts/post')
})

app.get('/chat',(req,res)=>{
    res.render('chat/chat')
})

app.get('/user/:id',(req,res)=>{
    let id = req.params.id; //params meaning 'wearing /' and query ?



    res.render('otherprofile/use',{"id": id});

})



app.get('/device',(req,res)=>{
    let agent = req.query.agent;
    const detector = new divice({
        clientIndexes: true,
        deviceIndexes: true,
        deviceAliasCode: false,
        deviceTrusted: false,
        deviceInfo: false,
        maxUserAgentSize: 500,
    });
    const result = detector.detect(agent);
    res.send(result);
})

//api qr code
var QRCode = require('qrcode');

app.get('/qrcode',(req,res)=>{
    let te = req.query.text;
    QRCode.toDataURL(te, function (err, url){
        res.json({"link":url})
    })

});

app.get('/miniapp',(req,res)=>{
    res.render('miniapp/mini')
});

app.get('/minigame',(req,res)=>{
    res.render('minigame/gmini')
});

app.get('/scanner',(req,res)=>{
    res.render('scan-page')
});


//how to send your file to fontend
app.get('/app-database',(req,res)=>{
    res.sendFile(__dirname+'/appdatabase.json')
});

app.get('/entertainment-list',(req,res)=>{
    res.sendFile(__dirname+'/entertainment.json')
})

let sever = app.listen('80',()=>{

})

let socketsever = socket(sever);

socketsever.on('connection',(socket)=>{
    socket.on('sends',(data)=>{
        socketsever.emit('sendsback',data);
    })
})