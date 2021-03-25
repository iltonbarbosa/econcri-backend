import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne} from 'typeorm'
import Cadastro  from "./Cadastro";

@Entity('categoria')
export default class Categoria {

	@PrimaryGeneratedColumn('increment')
	idcategoria!: string;

	@Column()
	descricao!: string;

	@OneToOne(type => Cadastro, cadastro => cadastro.idcategoria)
	@JoinColumn({ name: 'idcategoria' })
	cadastro!: Cadastro;
}