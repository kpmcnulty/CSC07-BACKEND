const express = require('express');
const app = express();
const port = 5000;


const users = { 
    users_list :
    [
       { 
          id : 'xyz789',
          name : 'Charlie',
          job: 'Janitor',
       },
       {
          id : 'abc123', 
          name: 'Mac',
          job: 'Bouncer',
       },
       {
          id : 'ppp222', 
          name: 'Mac',
          job: 'Professor',
       }, 
       {
          id: 'yat999', 
          name: 'Dee',
          job: 'Aspring actress',
       },
       {
          id: 'zap555', 
          name: 'Dennis',
          job: 'Bartender',
       }
    ]
 }
 
 
app.use(express.json());

app.get('/', (req, res) => {
   res.send('Hello World!');
});



app.get('/users', (req, res) => {
   const name = req.query.name;
   const job = req.query.job;
   if (name != undefined && job != undefined){
      //search by both
       let result = findUserByName(name).filter( (user) => user['job'] === job); ;
       result = {users_list: result};
       res.send(result);
   }else if (name != undefined && job == undefined){
      //search by name only
      let result = findUserByName(name)
      result = {users_list: result};
      res.send(result);
   }else if(name == undefined && job != undefined){
      //search by job only
      let result = findUserByJob(job)
      result = {users_list: result};
      res.send(result);
   }
   else{
       res.send(users);
   }
});

function addUser(user){
   users['users_list'].push(user);
}
app.post('/users', (req, res) => {
   const userToAdd = req.body;
   addUser(userToAdd);
   res.status(200).end();
});
app.delete('/users/:id', (req, res) => {
   const id = req.params['id']; //or req.params.id
   let result = findUserById(id);
   if (result === undefined || result.length == 0)
       res.status(404).send('Resource not found.');
   else {
      delUserById(id);
      res.send(users);
   }
});
function findUserById(id) {
   return users['users_list'].find( (user) => user['id'] === id); // or line below
   //return users['users_list'].filter( (user) => user['id'] === id);
}
function delUserById(id) {
   return users['users_list'].pop( users['users_list'].find( (user) => user['id']===id));
   
}

const findUserByName = (name) => { 
   return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
   return users['users_list'].filter( (user) => user['job'] === job); 
}
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});  