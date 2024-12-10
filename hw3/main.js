const express = require('express');
const fs = require('node:fs/promises');
const path = require('node:path')

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const readUsers = async ()=> {
    const filePath = path.join(process.cwd(), 'users.json');
    const data = await fs.readFile(filePath);
    return JSON.parse(data);
}

const writeUsers = async (user)=> {
    const filePath = path.join(process.cwd(), 'users.json');
    return await fs.writeFile(filePath, JSON.stringify(user));

}

app.get('/users', async (req, res)=>{
    const users = await readUsers();
    res.json(users)
})

app.post('/users', async (req, res) => {
    const users = await readUsers();
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    };
    users.push(newUser);
    await writeUsers(users)
    res.status(201).json(newUser);
});

app.get('/users/:userId', async (req, res)=>{
    const users = await readUsers();
    const user = users.find(user => user.id === +(req.params.userId));
    res.json(user);
});

app.put('/users/:userId', async(req, res) =>{
    const users = await readUsers();
    const userIndex = users.findIndex(user => user.id === +(req.params.userId));
    const updateUser = {
        ...users[userIndex],
        name: req.body.name ?? users[userIndex].name,
        email: req.body.email ?? users[userIndex].email,
        password: req.body.password ?? users[userIndex].password
    };
    users[userIndex] = updateUser
    await writeUsers(users)
    res.status(201).json(updateUser);

})

app.delete('/users/:userId', async (req, res) => {
    const users = await readUsers();
    const remainingUsers = users.filter(user => user.id !== +(req.params.userId));
    await writeUsers(remainingUsers)
    res.sendStatus(204);
});

app.listen(3000)