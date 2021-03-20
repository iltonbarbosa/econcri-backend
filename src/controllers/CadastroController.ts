import { Request, Response } from 'express';
import { getRepository, Not, Equal } from 'typeorm';
import * as Yup from 'yup'; 

import Cadastro from '../models/Cadastro';
import CadastroView from '../views/Cadastro_view';
import CadastroService from '../services/CadastroService';


interface ICadastro{
	idcadastro:string,
	idcategoria:string,
	idusuario:string,
	nome:string,
	cidade:string,
	tempo_atuacao:string,
	latitude:number,
	longitude:number,
	nome_contato:string,
	telefone_contato:string,
	email_contato:string
}

export default {

	async index (request: Request, response: Response){
		const { idusuario } = request.params;
		const cadastroRepositorio = getRepository(Cadastro);
		const cadastros = await cadastroRepositorio.find(
			{ relations: ["idcategoria"], 
			 where: { idusuario: idusuario },
			order: {nome: 'ASC'}
		 },
		);

		return response.json(CadastroView.renderMany(cadastros));
	},

	async show(request: Request, response: Response){
		const { id } = request.params;
		const cadastroRepositorio = getRepository(Cadastro);
		const cadastro = await cadastroRepositorio.find(
			{ relations: ["idcategoria"], 
			 where: { idcadastro: id }
		 },
		);

		return  response.json(cadastro);
	},

	async create(request: Request, response: Response){

		const {
			idcadastro,
			idusuario,
			idcategoria,
			nome,
			cidade,
			tempo_atuacao,
			latitude,
			longitude,
			nome_contato,
			telefone_contato,
			email_contato,

		} = request.body;

		const dados:ICadastro = {
			idcadastro,
			idusuario,
			idcategoria,
			nome,
			cidade,
			tempo_atuacao,
			latitude,
			longitude,
			nome_contato,
			telefone_contato,
			email_contato,
		};

		try{
			const cadastroService = new CadastroService();

			const cadastro = await cadastroService.salvar(dados);
	
			return response.status(200).json(cadastro.idcadastro);
		}catch (err) {
			console.log("erro: "+ err.message);
			return response.status(400).json( {statusText: err.message});
		}	
	},

	async delete(request: Request, response: Response){
		
		const id = request.params.id;
	
		const cadastroRepositorio = getRepository(Cadastro);

		if(id === '')
			response.status(400).send('Necessário informar o ID da cadastro');

		await cadastroRepositorio.delete(id);
	
		return response.status(200).json(id);
	},

	async salvarCordenadas(request: Request, response: Response){

		const {
			idcadastro,
			latitude,
			longitude

		} = request.body;

		try{
			const cadastroService = new CadastroService();
			
			const retorno = await cadastroService.salvarCordenadas(latitude,longitude,idcadastro);
	
			return response.status(200).json({statusText:'Dados gravados com sucesso!'+retorno});
		}catch (err) {
			console.log("erro: "+ err.message);
			return response.status(400).json( {statusText: err.message});
		}

	},

	async listaLocais (request: Request, response: Response){
		const cadastroRepositorio = getRepository(Cadastro);
		const cadastros = await cadastroRepositorio.find(
			{ relations: ["idcategoria"], 
			order: {nome: 'ASC'}
		 },
		);

		return response.json(CadastroView.renderLocais(cadastros));
	},

	async listaLocaisCategoria (request: Request, response: Response){
		const { idcategoria } = request.params;
		const cadastroRepositorio = getRepository(Cadastro);
		const cadastros = await cadastroRepositorio.find(
			{ relations: ["idcategoria"], 
			 where: { idcategoria: idcategoria },
			order: {nome: 'ASC'}
		 },
		);

		return response.json(CadastroView.renderLocais(cadastros));
	},


}