import { Router } from 'express';
import AutenticacaoService from './services/AutenticacaoService';

const sessionsRouter = Router();

sessionsRouter.post ('/autentica', async (request, response) => {
	try {
		const { email, senha } = request.body;

		const autenticacao = new AutenticacaoService();

		const { usuario, token } = await autenticacao.execute({
			email,
			senha
		});

	//	delete usuario.senha;
		
		return response.json ({ usuario, token });
	}catch (err) {
		return response.status(400).json ({
			error: err.message 
		});
	}
});

export default sessionsRouter;

