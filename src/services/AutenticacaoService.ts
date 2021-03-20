import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import authConfig from '../config/auth'; 

import Usuario from '../models/Usuario';

interface Request {
	email: string;
	senha: string;
}

interface Response {
	usuario: Usuario;
	token: string;
}

class AutenticacaoService {
	public async execute ({ email, senha }: Request): Promise<Response>{
		const usuarioRepositorio = getRepository(Usuario); 
		const usuario = await usuarioRepositorio.findOne({ where: { email } });

		if(!usuario){
			throw new Error('E-mail ou senha incorretos');
		}

		const senhaCriptografada = await compare(senha, usuario.senha);

		if(!senhaCriptografada){
			throw new Error('E-mail ou senha incorretos');
		}

		const { secret, expiresIn } = authConfig.jwt;

		const token = sign({}, secret, {
			subject: usuario.idusuario,
			expiresIn,
		});

		return {
			usuario,
			token,
		};
	}
}

export default AutenticacaoService;

