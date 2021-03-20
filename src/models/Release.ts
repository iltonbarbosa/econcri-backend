import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('release')
export default class Release {

	@PrimaryGeneratedColumn('increment')
	idrelease: string;

	@Column()
	idcadastro: string;

	@Column()
	release: string;

	@Column()
	linkportfolio: string;


}
