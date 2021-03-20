import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Release from '../models/Release';
import ReleaseService from '../services/ReleaseService';

interface IRelease{
	idcadastro:string,
	idrelease:string,
	release:string,
	linkportfolio:string
}

export default {

	async show(request: Request, response: Response){
		const { idcadastro } = request.params;
		const releaseRepositorio = getRepository(Release);
		const releases = await releaseRepositorio.findOneOrFail(
			{ where: { idcadastro: idcadastro } } );

		if(releases)	
			return response.json(releases);
		
		return {idrelease: '',
			idcadastro: '',
			release: '',
			linkportfolio:''}	
	},

	async create(request: Request, response: Response){
		
		const {
			idrelease,
			idcadastro,
			release,
			linkportfolio,
		} = request.body;

		const dados:IRelease = {
			idrelease,
			idcadastro,
			release,
			linkportfolio
		};

		try{
			const releaseService = new ReleaseService();
					
			const release = await releaseService.salvar(dados);
	
			return response.status(200).json(release.idrelease);
		}catch (err) {
			console.log("erro: "+ err.message);
			return response.status(400).json( {statusText: err.message});
		}
	}

}