const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const { mockTask, mockTaskUpdate } = require('./mocks/Task');

var token = process.env.TOKEN_TEST;

describe('Testando rotas de task', () => {
    var task_id = 0;

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.close();
    });

    it('Criando a task', async () => {
        const response = await request(app)
            .post('/tasks')
            .set('Authorization', 'bearer ' + token)
            .send(mockTask);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
        task_id = response.body.task.id;
    });

    it('Listando as tasks', async () => {
        const response = await request(app)
            .get('/tasks')
            .set('Authorization', 'bearer ' + token)
            .send(mockTask);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Atualizando a task', async () => {
        const response = await request(app)
            .put(`/tasks/${task_id}`)
            .set('Authorization', 'bearer ' + token)
            .send(mockTaskUpdate);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Deletando a task', async () => {
        const response = await request(app)
            .delete(`/tasks/${task_id}`)
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });
});