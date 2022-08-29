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
    return res.status(400).send("Preencha todos os campos!");
  } else {
    users.push({ username, avatar });
    res.status(200).send("OK");
  }
});

app.post('/tweets', (req, res) => {
  const { tweet } = req.body;
  const { user:username } = req.headers;
  if (!username || !tweet) {
    return res.status(400).send("Preencha todos os campos!");
  } else {
    tweets.push({
      username,
      avatar: users.find((user) => user.username === username).avatar,
      tweet,
    });
    res.status(200).send("OK");
  }
});

app.get('/tweets', (req, res) => {
  const page = parseInt(req.query.page);
  const limit = Math.ceil(tweets.length/10);
  if((page > limit && tweets.length > 0) || page < 1) {
    return res.status(400).send("Informe uma página existente!");
  }
  res.status(200).send(tweets.slice(0,tweets.length-(10*(page-1))).slice(-10).reverse());
});

app.get("/tweets/:username", (req, res) => {
  const { username } = req.params;
  const user = users.find((user) => user.username === username);
  if (!user) {
    return res.status(400).send("Usuário não encontrado!");
  } else {
    const tweetsUser = tweets.filter((tweet) => tweet.username === username);
    res.send(tweetsUser);
  }
});


app.listen(5000, () => console.log("Server is running port 5000"));


 