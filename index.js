import express, { json } from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(json());

let users = [
  {
    username: 'bobesponja', 
    avatar: "https://super.abril.com.br/wp-content/uploads/2020/09/04-09_gato_SITE.jpg?quality=70&strip=info" 
  }
];

let tweets = [
  {
    username: "bobesponja",
    tweet: "eu amo o hub"
  }
]

app.post('/sign-up', (req, res) => {
  const newUser = req.body;
  users.push({
    ...newUser,
    id: users.length + 1
  });
  res.send("OK");
});

app.post('/tweets', (req, res) => {
  const newTweet = req.body;
  tweets.push({
    ...newTweet,
    id: tweets.length + 1
  });
  res.send("OK");
});

app.get('/tweets', (req, res) => {
  res.send(tweets);
});


app.listen(5000, () => console.log("Server is running on port 5000."));


 