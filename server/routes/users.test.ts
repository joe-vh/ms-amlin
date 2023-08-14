import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import {app} from '../server';
import User from '../models/User';

import { Response } from 'superagent';

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
    let chaiHttpResponse: Response;

    beforeEach(async () => {
      sinon
        .stub(User, "findOne")
        .onFirstCall().resolves(user as User)
        .onCall(2).resolves(user as User)
        .onCall(3).resolves(undefined)
    });

    afterEach(()=>{
        (User.findOne as sinon.SinonStub).restore();
    })

    it('Test get /:id', async () => {
        sinon
            .stub(User, "findOne")
            .onFirstCall().resolves(user as User)

        chaiHttpResponse = await chai
            .request(app)
            .get('/api/users//1');

        expect(chaiHttpResponse.status).to.be.equals(200);
        expect(chaiHttpResponse.body).to.not.have.property('password');
        expect(chaiHttpResponse.body).to.not.have.property('token');

    });

    it('Test post /:id', async () => {
        sinon
            .stub(User, "findOne")
            .onFirstCall().resolves(user as User)

        chaiHttpResponse = await chai
            .request(app)
            .post('/api/users/1')
            .send({
                email: 'admin@admin.com',
                password: 'secret_admin'
            })

        expect(chaiHttpResponse.status).to.be.equals(200);
        expect(chaiHttpResponse.body).to.not.have.property('password');
        expect(chaiHttpResponse.body).to.have.property('token');
        expect(chaiHttpResponse.body.message).to.be.equal('User created. Token attached.');

    });
});