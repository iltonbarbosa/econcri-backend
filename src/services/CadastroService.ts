import { getRepository, Not, Equal, createQueryBuilder} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';

import Cadastro from '../models/Cadastro';

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

class CadastroService {

	/*public async findById(idcadastro:string):ICadastro{
		const cadastroRepositorio = getRepository(Cadastro);

		const cadastro = await createQueryBuilder("cadastro")
			.leftJoinAndSelect("cadastro.banda", "banda")
			.where("cadastro.idcadastro = :idcadastro",{idcadastro:idcadastro})
			.getOne();

		return cadastro;	
	}*/

	public async salvar (cadastro:ICadastro): Promise<Cadastro>{

		const cadastroRepositorio = getRepository(Cadastro);
		let status = '';
		
		let checkCadastroExiste:Cadastro = new Cadastro();
		
		if(cadastro.idcadastro && cadastro.idcadastro != 'undefined'){
			status = 'alteracao';
			const checkCadastroExiste = await cadastroRepositorio.findOne( {nome:cadastro.nome, 
																	  idcadastro: Not(Equal(cadastro.idcadastro)) });							  											  
		}else{
			const checkCadastroExiste = await cadastroRepositorio.findOne( { where: { nome:cadastro.nome } });
			cadastro.idcadastro = uuidv4();
		}

		if (checkCadastroExiste?.idcadastro){
			throw new Error('Este nome de cadastro já está em uso neste sistema. Utilize outro');
		}
		
		const cadastroDados = cadastroRepositorio.create(cadastro);

		try{
			if(status==='alteracao')
				await cadastroRepositorio.update(cadastro.idcadastro, cadastroDados);
			else
				await cadastroRepositorio.save(cadastroDados);

			return cadastroDados;
		}catch (err) {
			throw new Error( err.message);
		}
	}

	public async salvarCordenadas (latitude:string, longitude:string, idcadastro:string): Promise<string>{

		const cadastroRepositorio = getRepository(Cadastro);

		const retorno = await cadastroRepositorio.createQueryBuilder()
				.createQueryBuilder()
				.update('cadastro')
				.set({ latitude: latitude, longitude: longitude })
				.where("idcadastro = :id", { id: idcadastro })
				.execute();

		return retorno.toString();
	}
}

export default CadastroService;