import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import Usuario from '../models/Usuario';

import UsuarioService from '../services/UsuarioService';

export default {

	async index (request: Request, response: Response){
		const usuarioRepositorio = getRepository(Usuario);
		const usuarios = await usuarioRepositorio.find();
		return response.json(usuarios);
	},

	async show(request: Request, response: Response){
		const { idusuario } = request.params;
		const usuarioRepositorio = getRepository(Usuario);
		const usuario = await usuarioRepositorio.findOneOrFail(idusuario);

		return response.json(usuario);
	},

	async create(request: Request, response: Response){
		try {
			const {
				nome,
				email,
				senha,
				perfil,
				dadosconfirmados
			} = request.body;
		
			const usuarioService = new UsuarioService();
	
			const usuario = await usuarioService.execute({
				nome,
				email,
				senha,
				perfil,
				dadosconfirmados
			})
		
			return response.status(200).json(usuario);
		}catch (err) {
			return response.status(400).json( {error: err.message});
		}
	},

	async update(request: Request, response: Response){
		const {
			idusuario,
			nome,
			email,
			senha,
			perfil,
			dtcadastro,
			dadosconfirmados
		} = request.body;
	
		const usuarioRepositorio = getRepository(Usuario);

		const dados = {
			idusuario,
			nome,
			email,
			senha,
			perfil,
			dtcadastro,
			dadosconfirmados
		};

		const schema = Yup.object().shape({
			idusuario: Yup.string().required('Id obrigatório'),
			nome: Yup.string().required('Campo obrigatório'),
			email: Yup.string().required('Campo obrigatório'),
			perfil: Yup.number().required('Campo obrigatório'),
			senha: Yup.string().required('Campo obrigatório'),
		});

		await schema.validate(dados, {
			abortEarly: false,
		});

		const usuario = usuarioRepositorio.create(dados);
	
		await usuarioRepositorio.update(usuario.idusuario, usuario);
	
		return response.status(200).json(usuario);
	},

	async delete(request: Request, response: Response){
		
		const id = request.params.id;
	
		const usuarioRepositorio = getRepository(Usuario);

		if(id === '')
			response.status(400).send('Necessário informar o ID do usuário');

		await usuarioRepositorio.delete(id);
	
		return response.status(200).json(id);
	}
}