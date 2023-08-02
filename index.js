const express = require('express')
const path = require('path')
const app = express()
const db = require('./config')
const bodyParser = require('body-parser')
const port = +process.eventNames.PORT || 3000

// app.use(express.static('./static'))
app.use(express.urlencoded({extended:false}))

// Home page
app.get('/', (req, res) => {
    res.status(200).sendFile(
        path.resolve(__dirname, './static/html/index.html')
    )
})

app.get('/about', (req, res) => {
    req.status(200).json(
        {
            msg: "About page"
        }
    )
})

//mySQL
app.get('/users',(req,res)=>{
    const query =`
    SELECT userID,Firstname, Lastname
    FROM Users;
    `
    db.query(query, (err, data)=>{
        if (err) throw err
            res.json(
            {
                status: res.statusCode,
                results:data
            }
        )
        
        // if (err){
        //     res.status(404).json(
        //         {
        //         msg : 'An error occured'
        //     }
        //     )
        // }
    })
})

// RETRIEVE ONE USER
app.get('/user/:userID', (req, res) => {
    const query = `
        SELECT userID, Firstname, Lastname
        FROM Users
        WHERE userID = ${req.params.userID}
    `;


    db.query(query, [userID], (err, data) => {
        if (err) throw err;
        res.json({
            status: res.statusCode,
            results: data
        });
    });
});


app.post('/register',
bodyParser.json(),
(req, res)=>{
    const query = `INSERT INTO
    Users
    SET ?;
    `
    db.query(query, [req.body],
        (err)=>{
            if (err) throw err;
            res.json({
                status:res.statusCode,
                msg : "Registration was successful."
            })
        })
})

// UPDATE RECORDS
app.put('/user/:userID', bodyParser.json(), (req, res)=>{
    const query = `
    UPDATE Users SET ?
    WHERE userID = ${req.params.userID};
    `;
    db.query(query , [req.body], (err)=>{
        if (err) throw err
        res.json(
            {
                status : res.statusCode,
                msg : "The user record has been successfully updated"
            }
        )
    })
})


app.patch('/user/:userID', bodyParser.json(), (req, res)=>{
    const query = `
    UPDATE Users SET ?
    WHERE userID = ${req.params.userID};
    `;
    db.query(query , [req.body], (err)=>{
        if (err) throw err
        res.json(
            {
                status : res.statusCode,
                msg : "The user record has been successfully updated"
            }
        )
    })
})

// DELETE
app.delete('/user/:userID', bodyParser.json(), (req, res)=>{
    const query = `
    DELETE FROM Users
    WHERE userID = ${req.params.userID};
    `;
    db.query(query , [req.body], (err)=>{
        if (err) throw err
        res.json(
            {
                status : res.statusCode,
                msg : "The user record has been successfully deleted"
            }
        )
    })
})
// On a port where the server will listen from

app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
})


// app.all('*', (req, res) => {
//     res.status(404).json({
//         msg: 'An error has occurred'
//     })
// })
