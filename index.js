const express = require('express');
const expressMongoDb = require('express-mongo-db');
const bodyParser = require('body-parser');
const cors = require('cors');
const ObjectID = require('mongodb').ObjectID;
const app = express();

//cria conexão com o banco de dados
//e a disponibiliza na variável req.db
app.use(expressMongoDb('mongodb://localhost/cadastros'));
app.use(bodyParser.json());
app.use(cors());
// app get esta mostrar o cadastro  para gente  -backend - usuario n ira ver
app.get('/cadastros', (req, res) => {
    req.db.collection('usuarios').find().toArray((err, data) => {
        if(err){
            res.status(500).send();
            return;
        }
        res.send(data);
    });
});

// busca um sabor de churro pelo id
app.get('/usuarios/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('usuarios').findOne(query, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        if(!data){
            res.status(404).send();
            return;
        }

        res.send(data);
    });
});
// aqui o que tem dentro do cadastro>usuariio> aqui ????? - como o cliente tem que inserir por isso post

app.post('/usuario', (req, res) => {
    //remove dados indesejados do body
    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nascimento: req.body.nascimento,
        cep:req.body.cep
    };

    // exemplo de validação de email
    // if(req.body.email.indexOf('@') == -1){
    //     res.status(400).send({mensagem: 'Email inválido'});
    //     return;
    // }
   // insere um novo usurario 
    req.db.collection('usuarios').insert(usuario, (err) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(req.body);
    });
});

app.put('/usuario/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    let usuario = {
        email: req.body.email,
        senha: req.body.senha,
        nascimento: req.body.nascimento,
        cep: req.body.cep
    };
  

    req.db.collection('usuarios').updateOne(query, usuario, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});

// deleta um sabor de churro pelo id
app.delete('/usuario/:id', (req, res) => {
    let query = {
        _id: ObjectID(req.params.id)
    };

    req.db.collection('usuarios').deleteOne(query, (err, data) => {
        if(err){
            res.status(500).send();
            return;
        }

        res.send(data);
    });
});



app.listen(3000);
