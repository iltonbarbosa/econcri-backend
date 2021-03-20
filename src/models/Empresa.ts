import { Entity, Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity('empresa')
export default class Empresa {

	@PrimaryGeneratedColumn('increment')
	idempresa: string;

	@Column()
	idcadastro: string;

	@Column()
	cnpj: string;
}