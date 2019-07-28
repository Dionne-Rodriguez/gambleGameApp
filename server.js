const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient

var db, collection;

const url = "mongodb+srv://Rodriguez:ig7teXOk4AQif33k@rpsls-app-9ds4b.mongodb.net/test?retryWrites=true&w=majority";
const dbName = "UserBetMoney";

app.listen(2000, () => {
    MongoClient.connect(url, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        db = client.db(dbName);
        console.log("Connected to `" + dbName + "`!");
    });
});

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(express.static('public'))

//gets html template
app.get('/', (req, res) => {
  db.collection('bet').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.render('index.ejs', {bet: result})
     console.log({bet: result})
  })
})

 app.post('/input', (req, res) => {
   var betValue = parseInt(req.body.userBet)
   console.log(betValue)
   db.collection('bet').save({bet: betValue}, (err, result) => {
   if (err) return console.log(err)
   console.log('saved to database')
   res.redirect('/')
  })
})


app.put('/lossBet', (req, res) => {
  db.collection('bet')
  .findOneAndUpdate({bet: req.body.bet}, {
    $set: {
      bet: req.body.bet - req.body.amount
    }
  },{
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})

app.put('/winBet', (req, res) => {
  db.collection('bet')
  .findOneAndUpdate({bet: req.body.bet}, {
    $set: {
      bet:req.body.bet + req.body.amount * 10 
    }
  },{
    sort: {_id: -1},
    upsert: true
  }, (err, result) => {
    if (err) return res.send(err)
    res.send(result)
  })
})


app.delete('/bet', (req, res) => {
  console.log('CALLED')
  db.collection('bet').findOneAndDelete({bet: parseInt(req.body.bet)}, (err, result) => {
    if (err) return res.send(500, err)
    res.send({message:'Message deleted!'})
  })
})
