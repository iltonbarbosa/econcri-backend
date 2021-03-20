import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Cantor from '../models/Cantor';

export default {

	async show(request: Request, response: Response){
		const { idcadastro } = request.params;
		const cantorRepositorio = getRepository(Cantor);
		const cantor = await cantorRepositorio.findOneOrFail(
			{ where: { idcadastro: idcadastro },
		 },
		);

		return response.json(cantor);
	},

	async create(request: Request, response: Response){
		
		const {
			idcadastro,
			estilo,
			autoral_cover
		} = request.body;
	
		const cantorRepositorio = getRepository(Cantor);

		const dados = {
			idcantor: uuidv4(),
			idcadastro,
			estilo,
			autoral_cover
		};

		const schema = Yup.object().shape({
			idcadastro: Yup.string().required('Campo obrigatório'),
		});

		await schema.validate(dados, {
			abortEarly: false,
		});

		const cantor = cantorRepositorio.create(dados);

		await cantorRepositorio.save(cantor);
	
		return response.status(200).json(cantor);
	},

	async update(request: Request, response: Response){
		const {
			estilo,
			autoral_cover
		} = request.body;
	
		const cantorRepositorio = getRepository(Cantor);

		const dados = {
			estilo,
			autoral_cover
		};

		const cantor = cantorRepositorio.create(dados);
	
		await cantorRepositorio.update(cantor.idcantor, cantor);
	
		return response.status(200).json(cantor);
	},

}