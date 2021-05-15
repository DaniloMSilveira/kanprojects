const { Router } = require("express");

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const SprintController = require('./controllers/SprintController');
const TaskController = require('./controllers/TaskController');
const TaskUserController = require('./controllers/TaskUserController');

const authMiddleware = require('./middlewares/auth');

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/login', UserController.sigIn);
// Neste caso, o Middleware de Autenticação só vai funcionar para as rotas que estão abaixo dele.
routes.use(authMiddleware);
routes.get('/users', UserController.show);
routes.delete('/users', UserController.delete);

// Projects
routes.get('/projects', ProjectController.show);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.delete);

// Sprints
routes.get('/sprints', SprintController.show);
routes.post('/sprints', SprintController.store);
routes.delete('/sprints/:id', SprintController.delete);

// Tasks
routes.get('/tasks', TaskController.show);
routes.post('/tasks', TaskController.store);
routes.put('/tasks/:id', TaskController.update);
routes.delete('/tasks/:id', TaskController.delete);

// TaskUsers
routes.post('/taskUsers', TaskUserController.store);
routes.delete('/taskUsers/:id', TaskUserController.delete);

module.exports = routes;