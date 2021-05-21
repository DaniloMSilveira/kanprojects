const request = require('supertest');
const app = require('../src/app');
const db = require('../src/database');

const { mockProject, mockProjectUpdate } = require('./mocks/Project');

var token = process.env.TOKEN_TEST;

describe('Testando rotas de projeto', () => {
    var project_id = 0;

    beforeAll(async () => {
        await db.connect();
    });

    afterAll(async () => {
        await db.close();
    });

    it('Criando o projeto', async () => {
        const response = await request(app)
            .post('/projects')
            .set('Authorization', 'bearer ' + token)
            .send(mockProject);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
        project_id = response.body.project.id;
    });

    it('Listando os projetos', async () => {
        const response = await request(app)
            .get('/projects')
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Atualizando o projeto', async () => {
        const response = await request(app)
            .put(`/projects/${project_id}`)
            .set('Authorization', 'bearer ' + token)
            .send(mockProjectUpdate);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });

    it('Deletando o projeto', async () => {
        const response = await request(app)
            .delete(`/projects/${project_id}`)
            .set('Authorization', 'bearer ' + token);
        expect(response.status).toBe(200);
        expect(response.body.status).toEqual('success');
    });
});