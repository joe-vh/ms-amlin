"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const cors = require('cors');
exports.app = (0, express_1.default)();
const fs = require('fs');
// const html = fs.readFileSync('../ui/build/index.html');
const usersRoutes = require('./routes/users');
const db = require('./db');
// app.use(express.static('../ui/public'));
// app.use(express.static('../ui/build'));
exports.app.use(express_1.default.json());
exports.app.use(cors());
exports.app.get('/api', (req, res) => {
    res.json({ message: 'API root.' });
});
exports.app.use('/api/users', usersRoutes);
// app.get("*", (req: Request, res: Response) => {
//     res.status(200);
//     res.send(html);
// });
db.sequelize.sync({ force: true })
    .then(() => {
    console.log("Synced db.");
    exports.app.listen(process.env.PORT || 7777, () => console.log('listening'));
})
    .catch((err) => {
    console.log("Failed to sync db: " + err.message);
    process.exit(1);
});
