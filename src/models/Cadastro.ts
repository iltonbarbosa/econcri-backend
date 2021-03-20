import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import Categoria from './Categoria'

@Entity('cadastro')
export default class Cadastro {

	@PrimaryGeneratedColumn('increment')
	idcadastro: string;

	@Column()
	@OneToOne(() => Categoria, categoria => categoria.idcategoria)
	@JoinColumn({name: 'idcategoria'})
	idcategoria: string;

	@Column()
	idusuario: string;

	@Column()
	nome: string;

	@Column()
	cidade: string;

	@Column()
	tempo_atuacao: string;

	@Column()
	latitude: number;

	@Column()
	longitude: number;

	@Column()
	nome_contato: string;

	@Column()
	telefone_contato: string;

	@Column()
	email_contato: string;

	@Column()
	dtcadastro: Date;
}