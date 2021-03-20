import Categoria from '../models/Categoria';

export default {
	render(categoria: Categoria){
		return {
			id: categoria.idcategoria,
			descricao: categoria.descricao
		};
	},

	renderMany(categorias: Categoria[]){
		return categorias.map(categoria => this.render(categoria));
	}
}