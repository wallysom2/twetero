import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

let users = [];

let tweets = []

app.post('/sign-up', (req, res) => {
  const { username, avatar } = req.body;
  
  if (!username || !avatar) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    users.push({ username, avatar });
    res.status(201).send("OK");
  }
});

app.post('/tweets', (req, res) => {
  const { tweet } = req.body;
  const { user:username } = req.headers;
  if (!username || !tweet) {
    return res.status(400).send("Todos os campos são obrigatórios!");
  } else {
    tweets.push({
      username,
      avatar: users.find((user) => user.username === username).avatar,
      tweet,
    });
    res.status(201).send("OK");
  }
});;

app.get('/tweets', (req, res) => {
  res.send(tweets);
});


app.listen(5002, () => console.log("Server is running on port 5000."));


 