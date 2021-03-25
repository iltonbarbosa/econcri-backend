import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('cantor')
export default class Cantor {

	@PrimaryGeneratedColumn('increment')
	idcantor!: string;

	@Column()
	idcadastro!: string;

	@Column()
	estilo!: string;

	@Column()
	autoral_cover!: string;

}
