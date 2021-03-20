import { Request, Response } from 'express';
import { getRepository, Not, Equal } from 'typeorm';
import * as Yup from 'yup'; 
import { v4 as uuidv4 } from 'uuid';

import Categoria from '../models/Categoria';
import CategoriaView from '../views/Categoria_view';

export default {

	async index (request: Request, response: Response){
		const categoriaRepositorio = getRepository(Categoria);
		const categorias = await categoriaRepositorio.find(
			{order: { descricao: "ASC"	}});
		return response.json(categorias);
	},

	async show(request: Request, response: Response){
		const { id } = request.params;
		const categoriaRepositorio = getRepository(Categoria);
		const categoria = await categoriaRepositorio.findOneOrFail(id);

		return response.json(CategoriaView.render(categoria));
	},

	async create(request: Request, response: Response){
		
		const {
			descricao,
		} = request.body;
	
		const categoriaRepositorio = getRepository(Categoria);

		const dados = {
			idcategoria: uuidv4(),
			descricao
		};

		const schema = Yup.object().shape({
			idcategoria: Yup.string().required('Campo obrigatório'),
			descricao: Yup.string().required('Campo obrigatório')
		});

		await schema.validate(dados, {
			abortEarly: false,
		});

		const checkCategoriaExiste = await categoriaRepositorio.findOne( {
			where: { descricao }
		});

		if (checkCategoriaExiste){
			return response.status(400).json( {error: "Uma categoria com este nome já existe no banco de dados."});
		}

		const categoria = categoriaRepositorio.create(dados);

		await categoriaRepositorio.save(categoria);
	
		return response.status(200).json(categoria);
	},

	async update(request: Request, response: Response){
		const {
			idcategoria,
			descricao,
		} = request.body;
	
		const categoriaRepositorio = getRepository(Categoria);

		const dados = {
			idcategoria,
			descricao
		};

		const schema = Yup.object().shape({
			idcategoria: Yup.string().required('Id obrigatório'),
			descricao: Yup.string().required('Campo obrigatório')
		});

		await schema.validate(dados, {
			abortEarly: false,
		});

		const checkCategoriaExiste = await categoriaRepositorio.findOne( {
			descricao,
			idcategoria: Not(Equal(idcategoria))
			
		});

		if (checkCategoriaExiste){
			return response.status(400).json( {error: "Uma categoria com este nome já existe no banco de dados."});
		}

		const categoria = categoriaRepositorio.create(dados);
	
		await categoriaRepositorio.update(categoria.idcategoria, categoria);
	
		return response.status(200).json(categoria);
	},

	async delete(request: Request, response: Response){
		
		const id = request.params.id;
	
		const categoriaRepositorio = getRepository(Categoria);

		if(id === '')
			response.status(400).send('Necessário informar o ID da categoria');

		await categoriaRepositorio.delete(id);
	
		return response.status(200).json(id);
	}
}