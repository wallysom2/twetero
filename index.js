import express, { json } from 'express';
import cors from 'cors';
import chalk from 'chalk'; // opcional

const app = express();
app.use(cors());
app.use(json());

app.post("/rota", (request, response) => {
    const body = request.body; 
		// ...
    response.send(algumaResposta);
});


app.listen(5000, () => console.log("Server is running."));


