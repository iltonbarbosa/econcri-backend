import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Linkvideo from '../models/Linkvideo';

export default {

	async show(request: Request, response: Response){
		const { idcadastro } = request.params;
		const linkvideoRepositorio = getRepository(Linkvideo);
		const linkvideos = await linkvideoRepositorio.find(
			{ where: { idcadastro: idcadastro },
		 },
		);
		return response.json(linkvideos);
	},

	async create(request: Request, response: Response){
		
		let req = JSON.stringify(request.body);
		var dados = JSON.parse(req);
		var links = dados.links;
	
		const linkvideoRepositorio = getRepository(Linkvideo);
/*
		const schema = Yup.object().shape({
			idcadastro: Yup.string().required('Campo obrigatório'),
		});

		await schema.validate(dados, {
			abortEarly: false,
		});
*/
		if(links.length > 0){
			await linkvideoRepositorio.createQueryBuilder()
				.delete()
				.from('linkvideo')
				.where("idcadastro = :id", { id: links[0].idcadastro })
				.execute().then(async()=>{
					for (let i = 0; i < links.length; i++) {
						const item = links[i];
						if(item){
							dados = {
								'idlinkvideo': uuidv4(),
								'idcadastro': item.idcadastro,
								'link':item.linkvideo
							}; 
	
							const linkvideo = linkvideoRepositorio.create(dados);
							await linkvideoRepositorio.save(linkvideo);
						}
			
					};
				});
			return response.status(200).json("Dados registrados com sucesso!");	
		}else
			return response.status(100).json("Não há informação sobre o link de videos!");
	},

}