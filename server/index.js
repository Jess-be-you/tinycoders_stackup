import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

//components
import Connection from './database/db.js';
import Router from './routes/route.js';


dotenv.config();

const app = express();

const whitelist = [
	"http://127.0.0.1:3000", 
	"localhost", 
	"http://localhost:3000",
    "https://tinycoders-stackup-evento-frontend.vercel.app",
    "https://tinycoders-stackup-evento-api.vercel.app"

];

const corsOptions = {
	origin(origin, callback) {
		if (!origin) {
			return callback(null, true);
		}
		if (whitelist.indexOf(origin) !== -1) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
};

app.use(cors(corsOptions));

// app.use(cors({
//     origin:["https://tinycoders-stackup-evento-frontend.vercel.app"],
//     methods: ["POST","GET"],
//     credentials:true
// }))

app.use(cors());
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', Router);


const PORT = 8000;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

Connection(username, password);

app.listen(PORT, () => console.log(`Server is running successfully helloon PORT ${PORT}`));