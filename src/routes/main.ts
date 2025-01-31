import { Router } from 'express';
import { prisma } from '../libs/prisma';
import { ativarUser, createUser, desativarUser, getAllUsers, getUser, mudarName } from '../services/user';

export const mainRouter = Router();

mainRouter.get('/ping', (req, res) => {
    res.json({ pong: true });
});

mainRouter.get('/test', (req, res) => {
    res.json({ testado: true })
});




mainRouter.get('/user', async (req, res) => {  // pega todos usuarios
    const results = await getAllUsers();
    res.json({ results });
})

mainRouter.get('/user/:id', async (req, res) => { // pega 1 usuario
    const userId = req.params.id;

    const result = await getUser(Number(userId));
    res.json({ result });
})



mainRouter.post('/user', async (req, res) => {  // cadastra 1 usuario

    const { name, email, password } = req.body

    const user = await createUser({
        name, email, password
    });

    if (!user) {
        res.status(501).json({ error: "Email já cadastrado!!!" });
    }

    res.json({ user });
});



mainRouter.put('/user/ativar/:id', async (req, res) => { // ativa o status usuario
    const userId = req.params.id;

    const result = await ativarUser(Number(userId));
    res.json({ result });
});

mainRouter.put('/user/desativar/:id', async (req, res) => { // desativa o status usuario
    const userId = req.params.id;

    const result = await desativarUser(Number(userId));
    res.json({ result });
});

mainRouter.put('/user/alterarNome/:id', async (req, res) => {
    const userId = req.params.id;
    const { newName } = req.body;

    const result = await mudarName(Number(userId), newName);
    res.json({ result });
});