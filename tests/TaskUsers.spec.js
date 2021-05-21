const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const { mockTaskUsers } = require('./mocks/TaskUsers');

var token = process.env.TOKEN_TEST;

describe('Testando rotas de task', () => {
    var taskUsers_id = 0;

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.close();
    });

    it('Adicionando usuário na task', async () => {
        const response = await request(app)
            .post('/taskUsers')
            .set('Authorization', 'bearer ' + token)
            .send(mockTaskUsers);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
        taskUsers_id = response.body.taskUsers.id;
    });

    it('Deletando usuário da task', async () => {
        const response = await request(app)
            .delete(`/taskUsers/${taskUsers_id}`)
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });
});