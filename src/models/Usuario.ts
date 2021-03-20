import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm/browser';

@Entity('usuario')
export default class Usuario {

	@PrimaryGeneratedColumn('increment')
	idusuario: string;

	@Column()
	nome: string;

	@Column()
	email: string;

	@Column()
	senha: string;

	@Column()
	perfil: number;

	@Column()
	dtcadastro: string;

	@Column()
	dadosconfirmados: boolean;
}
