import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('agenda')
export default class Agenda {

	@PrimaryGeneratedColumn('increment')
	idagenda!: string;

	@Column()
	idcadastro!: string;

	@Column()
	dtagenda!: Date;

	@Column()
	hora!: string;

	@Column()
	local!: string;

}