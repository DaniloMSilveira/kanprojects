const { Router } = require("express");

const UserController = require('./controllers/UserController');
const ProjectController = require('./controllers/ProjectController');
const SprintController = require('./controllers/SprintController');
const TaskController = require('./controllers/TaskController');
const TaskUserController = require('./controllers/TaskUserController');

const authMiddleware = require('./middlewares/auth');

const routes = new Router();

// PAGINAS (EJS)
routes.get('/', (req, res) => res.render('pages/login'));
routes.get('/register', (req, res) => res.render('pages/register'));
routes.get('/home', (req, res) => res.render('pages/home'));

// ROTAS
routes.post('/users', UserController.store);
routes.post('/login', UserController.sigIn);
// Neste caso, o Middleware de Autenticação só vai funcionar para as rotas que estão abaixo dele.
routes.use(authMiddleware);
routes.get('/users', authMiddleware, UserController.show);
routes.get('/usersall', authMiddleware, UserController.showAll);
routes.delete('/users', authMiddleware, UserController.delete);

// Projects
routes.get('/projects', authMiddleware, ProjectController.show);
routes.post('/projects', authMiddleware, ProjectController.store);
routes.put('/projects/:id', authMiddleware, ProjectController.update);
routes.delete('/projects/:id', authMiddleware, ProjectController.delete);

// Sprints
routes.get('/sprints', authMiddleware, SprintController.show);
routes.post('/sprints', authMiddleware, SprintController.store);
routes.delete('/sprints/:id', authMiddleware, SprintController.delete);

// Tasks
routes.get('/tasks', authMiddleware, TaskController.show);
routes.post('/tasks', authMiddleware, TaskController.store);
routes.put('/tasks/:id', authMiddleware, TaskController.update);
routes.delete('/tasks/:id', authMiddleware, TaskController.delete);

// TaskUsers
routes.post('/taskUsers', authMiddleware, TaskUserController.store);
routes.delete('/taskUsers/:id', authMiddleware, TaskUserController.delete);

module.exports = routes;