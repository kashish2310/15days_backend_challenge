const express = require('express');
const router = express.Router();
const fs = require('fs'); // manipulates files
const path = require('path'); // find path of a file


const dataFilePath = path.join(__dirname, '../UserDataBase.json');

function readDataFromFile(){
    const data = fs.readFileSync(dataFilePath);
    return JSON.parse(data);
}

function writeDataToFile(data){
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
}



router.get('/users/:id',(req,res) => {
const users = readDataFromFile();
const  userId = req.params.id;

const user = users.find(user => user.id === parseInt(userId));
if(user){
    res.send(user);
}
else{
    res.status(404).send({
        error: 'user not found'
    })
}
});
// we can see get requests directly but for post,put n delete we need postman//

router.post('/users',(req,res)=>{
    const user = req.body;
    // console.log('user',user);

    const users = readDataFromFile();
    user.id = new Date().getTime();

    users.push(user);
    writeDataToFile(users); //write means whole prev data is erased and nw data (here users) is overwritten.
    res.send(user);
})

router.put('/users/:id',(req,res) => {
    const users = readDataFromFile();
    const userId = req.params.id;
    const updateUser = req.body;
    
    const userIndex = users.findIndex(user => user.id === parseInt(userId));
    console.log('userIndex', userIndex);
    if(userIndex == -1){
       return res.status(404).send({
            error: 'user not found'
        })
    }
    
    users[userIndex] = {
        ...users[userIndex],
        ...updateUser
    }

    writeDataToFile(users);
    res.send(users[userIndex]);
    });

router.delete('/users/:id', (req,res) => {
    const users = readDataFromFile();
    const userId = req.params.id;
    
    const userIndex = users.findIndex(user => user.id === parseInt(userId));
    
    if(userIndex == -1){
        return res.status(404).send({
            error: 'user not found'
        })
    }
    users.splice(userIndex,1);
    writeDataToFile(users);
    res.send({
        message: `User  with id ${userId} has been deleted`
    });
});

router.get('/test', (req,res) => res.send({
    message: 'test is working',
    path: dataFilePath
}));

module.exports = router;