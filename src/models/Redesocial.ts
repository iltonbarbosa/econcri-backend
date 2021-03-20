import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('redesocial')
export default class Redesocial {

	@PrimaryGeneratedColumn('increment')
	idredesocial: string;

	@Column()
	idcadastro: string;

	@Column()
	nome: string;

	@Column()
	link: string;

}
