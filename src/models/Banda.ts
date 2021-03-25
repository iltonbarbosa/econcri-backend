import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('banda')
export default class Banda {

	@PrimaryGeneratedColumn('increment')
	idbanda!: string;

	@Column()
	idcadastro!: string;

	@Column()
	estilo!: string;

	@Column()
	autoral_cover!: string;

	@Column()
	num_integrantes!: string;

	@Column()
	nome_integrantes!: string;

}