const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const { mockSprint } = require('./mocks/Sprint');

var token = process.env.TOKEN_TEST;

describe('Testando rotas de sprint', () => {
    var sprint_id = 0;

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.close();
    });

    it('Criando a sprint', async () => {
        const response = await request(app)
            .post('/sprints')
            .set('Authorization', 'bearer ' + token)
            .send(mockSprint);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
        sprint_id = response.body.sprint.id;
    });

    it('Listando as sprints', async () => {
        const response = await request(app)
            .get('/sprints')
            .set('Authorization', 'bearer ' + token)
            .send(mockSprint);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Deletando a sprint', async () => {
        const response = await request(app)
            .delete(`/sprints/${sprint_id}`)
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });
});