"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sinon = __importStar(require("sinon"));
const chai = __importStar(require("chai"));
// @ts-ignore
const chaiHttp = require("chai-http");
const server_1 = require("../server");
const User_1 = __importDefault(require("../models/User"));
chai.use(chaiHttp);
const { expect } = chai;
const user = {
    dataValues: {
        id: 1,
        name: 'Admin',
        email: 'admin@admin.com',
        password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
    }
};
describe('Test routes/controllers', () => {
    let chaiHttpResponse;
    beforeEach(async () => {
        sinon
            .stub(User_1.default, "findOne")
            .onFirstCall().resolves(user)
            .onCall(2).resolves(user)
            .onCall(3).resolves(undefined);
    });
    afterEach(() => {
        User_1.default.findOne.restore();
    });
    it('Test get /:id', async () => {
        sinon
            .stub(User_1.default, "findOne")
            .onFirstCall().resolves(user);
        chaiHttpResponse = await chai
            .request(server_1.app)
            .get('/api/users//1');
        expect(chaiHttpResponse.status).to.be.equals(200);
        expect(chaiHttpResponse.body).to.not.have.property('password');
        expect(chaiHttpResponse.body).to.not.have.property('token');
    });
    it('Test post /:id', async () => {
        sinon
            .stub(User_1.default, "findOne")
            .onFirstCall().resolves(user);
        chaiHttpResponse = await chai
            .request(server_1.app)
            .post('/api/users/1')
            .send({
            email: 'admin@admin.com',
            password: 'secret_admin'
        });
        expect(chaiHttpResponse.status).to.be.equals(200);
        expect(chaiHttpResponse.body).to.not.have.property('password');
        expect(chaiHttpResponse.body).to.have.property('token');
        expect(chaiHttpResponse.body.message).to.be.equal('User created. Token attached.');
    });
});
