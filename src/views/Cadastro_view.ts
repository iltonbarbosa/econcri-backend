import Cadastro from '../models/Cadastro';

export default {
	render(cadastro: Cadastro){
		return {
			idcadastro: cadastro.idcadastro,
			nome: cadastro.nome,
			nomeContatoPrincipal:cadastro.nome_contato,
			cidade: cadastro.cidade,
			idcategoria: cadastro.idcategoria,
			categoria:cadastro.idcategoria
		};
	},

	renderLocal(cadastro: Cadastro){
		return {
			idcadastro: cadastro.idcadastro,
			nome: cadastro.nome,
			latitude:cadastro.latitude,
			longitude: cadastro.longitude,
			categoria:cadastro.idcategoria,
			cidade: cadastro.cidade,
		};
	},

	renderMany(cadastros: Cadastro[]){
		return cadastros.map(cadastro => this.render(cadastro));
	},

	renderLocais(cadastros: Cadastro[]){
		return cadastros.map(cadastro => this.renderLocal(cadastro));
	},

}