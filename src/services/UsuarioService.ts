import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

import Usuario from '../models/Usuario';

interface Request {
	nome: string;
	email: string;
	senha: string;
	perfil: number;
	dadosconfirmados: boolean;
}
class UsuarioService {
	public async execute({nome, email, senha, perfil, dadosconfirmados}:Request): Promise<Usuario> {
		const usuarioRepositorio = getRepository(Usuario);
		const checkUsuarioExiste = await usuarioRepositorio.findOne( {
			where: { email }
		});

		if (checkUsuarioExiste){
			throw new Error('Este endereço de e-mail já está em uso neste sistema. Utilize outro');
		}

		const senhaCriptografada = await hash(senha, 8); 

		const dados = {
			idusuario: uuidv4(),
			nome,
			email,
			senha: senhaCriptografada,
			perfil,
			dadosconfirmados
		};

		const usuario = usuarioRepositorio.create(dados);
		await usuarioRepositorio.save(usuario);

		return usuario;
	} 
}
export default UsuarioService;
