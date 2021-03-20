import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Banda from '../models/Banda';

export default {

	async show(request: Request, response: Response){
		const { idcadastro } = request.params;
		const bandaRepositorio = getRepository(Banda);
		const banda = await bandaRepositorio.findOneOrFail(
			{ where: { idcadastro: idcadastro },
		 },
		);
		return response.json(banda);
	},

	async create(request: Request, response: Response){
		
		const {
			idcadastro,
			estilo,
			autoral_cover,
			num_integrantes,
			nome_integrantes
		} = request.body;
	
		const bandaRepositorio = getRepository(Banda);

		const dados = {
			idbanda: uuidv4(),
			idcadastro,
			estilo,
			autoral_cover,
			num_integrantes,
			nome_integrantes
		};

		const schema = Yup.object().shape({
			idcadastro: Yup.string().required('Campo obrigatório'),
			autoral_cover:Yup.string().required('Campo obrigatório')
		});

		await schema.validate(dados, {
			abortEarly: false,
		});

		const banda = bandaRepositorio.create(dados);

		await bandaRepositorio.save(banda);
	
		return response.status(200).json(banda.idcadastro);
	},

	async update(request: Request, response: Response){
		const {
			idbanda,
			estilo,
			autoral_cover,
			num_integrantes,
			nome_integrantes
		} = request.body;
	
		const bandaRepositorio = getRepository(Banda);

		const dados = {
			idbanda,
			estilo,
			autoral_cover,
			num_integrantes,
			nome_integrantes
		};

	/*	const schema = Yup.object().shape({
			autoral_cover: Yup.string().required('Campo obrigatório')
		});

		await schema.validate(dados, {
			abortEarly: false,
		});*/
	
		const banda = bandaRepositorio.create(dados);
	
		await bandaRepositorio.update(banda.idbanda, banda);
	
		return response.status(200).json(banda);
	},

}