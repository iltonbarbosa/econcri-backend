import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Redesocial from '../models/Redesocial';

export default {

	async show(request: Request, response: Response){
		const { idcadastro } = request.params;
		const redesocialRepositorio = getRepository(Redesocial);
		const redesocial = await redesocialRepositorio.find(
			{ where: { idcadastro: idcadastro },
		 },
		);

		return response.json(redesocial);
	},

	async create(request: Request, response: Response){
		let req = JSON.stringify(request.body);
		var dados = JSON.parse(req);
		var redes = dados.redesSociais;
		const redesocialRepositorio = getRepository(Redesocial);

		//https://typeorm.io/#/select-query-builder/getting-the-generated-query
		await redesocialRepositorio.createQueryBuilder()
			.delete()
			.from('redesocial')
			.where("idcadastro = :id", { id: redes[0].idcadastro })
			.execute().then(async()=>{
				for (let i = 0; i < redes.length; i++) {
					const item = redes[i];
					if(item.nome && item.link)
						dados = {
							'idredesocial': uuidv4(),
							'idcadastro': item.idcadastro,
							'nome':item.nome,
							'link':item.link
					}; 
		
					const redesocial = redesocialRepositorio.create(dados);
					await redesocialRepositorio.save(redesocial);
					
				};
			});

		

		return response.status(200).json("Dados registrados com sucesso!");
	},


}