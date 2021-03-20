import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Agenda from '../models/Agenda';

export default {

	async show (request: Request, response: Response){
		const { idcadastro } = request.params;
		const agendaRepositorio = getRepository(Agenda);
		const agendas = await agendaRepositorio.find(
			{ where: { idcadastro: idcadastro },
		 },
		);

		if(agendas.length > 0){ 
		  return response.json(agendas);
		}
		
		return null;  
	},

	async create(request: Request, response: Response){
		let req = JSON.stringify(request.body);
		var dados = JSON.parse(req);
		var agendas = dados.agendas;
		
		const agendaRepositorio = getRepository(Agenda);

		await agendaRepositorio.createQueryBuilder()
			.delete()
			.from('agenda')
			.where("idcadastro = :id", { id: agendas[0].idcadastro })
			.execute().then(async()=>{
				for (let i = 0; i < agendas.length; i++) {
					const item = agendas[i];
					if(item.dtagenda && item.hora)
						dados = {
							'idagenda': uuidv4(),
							'idcadastro': item.idcadastro,
							'dtagenda':item.dtagenda,
							'hora':item.hora,
							'local':item.local
					}; 
		
					const agenda = agendaRepositorio.create(dados);
					await agendaRepositorio.save(agenda);
					
				};
			});

		

		return response.status(200).json("Dados registrados com sucesso!");
	},

	
}