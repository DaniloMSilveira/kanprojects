const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const { mockUserObject, mockUserEmail } = require('./mocks/User');

var token = '';

describe('User', () => {
    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.close();
    });

    it('Criando o usuário', async () => {
        const response = await request(app)
            .post('/users')
            .send(mockUserObject);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Efetuando o login', async () => {
        const response = await request(app)
            .post('/login')
            .send(mockUserObject);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');

        // preenchendo o token para as demais rotas
        token = response.body.token;
    });

    it('Exibindo o usuário', async () => {
        const response = await request(app)
            .get('/users')
            .set('Authorization', 'bearer ' + token)
            .send(mockUserEmail);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Deletando o usuário', async () => {
        const response = await request(app)
            .delete('/users')
            .set('Authorization', 'bearer ' + token)
            .send(mockUserEmail);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });
});