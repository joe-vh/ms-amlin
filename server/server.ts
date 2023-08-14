import express, {Express, Request, Response} from 'express';
import {Error} from 'sequelize';
const cors = require('cors');
export const app: Express = express();
const fs = require('fs');
// const html = fs.readFileSync('../ui/build/index.html');
const usersRoutes = require('./routes/users');
const db = require('./db');

// app.use(express.static('../ui/public'));
// app.use(express.static('../ui/build'));
app.use(express.json());
app.use(cors());



app.get('/api', (req: Request, res: Response) => {
    res.json({message: 'API root.'});
});

app.use('/api/users', usersRoutes);


// app.get("*", (req: Request, res: Response) => {
//     res.status(200);
//     res.send(html);
// });

db.sequelize.sync({ force: true })
    .then(() => {
        console.log("Synced db.");
        app.listen(process.env.PORT || 7777, () => console.log('listening'));
    })
    .catch((err: Error) => {
        console.log("Failed to sync db: " + err.message);
        process.exit(1);
    });