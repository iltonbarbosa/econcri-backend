import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('linkvideo')
export default class Linkvideo {

	@PrimaryGeneratedColumn('increment')
	idlinkvideo!: string;

	@Column()
	idcadastro!: string;

	@Column()
	link!: string;
}