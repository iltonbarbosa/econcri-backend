import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Empresa from '../models/Empresa';

export default {

	async show(request: Request, response: Response){
		const { idcadastro } = request.params;
		const empresaRepositorio = getRepository(Empresa);
		const empresa = await empresaRepositorio.findOneOrFail(
			{ where: { idcadastro: idcadastro },
		 },
		);

		return response.json(empresa);
	},

	async create(request: Request, response: Response){
		
		const {
			idcadastro,
			cnpj
		} = request.body;
	
		const empresaRepositorio = getRepository(Empresa);

		const dados = {
			idempresa: uuidv4(),
			idcadastro,
			cnpj
		};

		const schema = Yup.object().shape({
			idcadastro: Yup.string().required('Campo obrigatório'),
		});

		await schema.validate(dados, {
			abortEarly: false,
		});

		const empresa = empresaRepositorio.create(dados);

		await empresaRepositorio.save(empresa);
	
		return response.status(200).json(empresa);
	},

	async update(request: Request, response: Response){
		const {
			cnpj
		} = request.body;
	
		const empresaRepositorio = getRepository(Empresa);

		const dados = {
			cnpj
		};

		const empresa = empresaRepositorio.create(dados);
	
		await empresaRepositorio.update(empresa.idempresa, empresa);
	
		return response.status(200).json(empresa);
	},

}