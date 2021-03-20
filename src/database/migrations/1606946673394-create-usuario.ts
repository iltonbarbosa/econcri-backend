import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsuario1606946673394 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'usuario',
			columns: [
				{
					name: 'idusuario',
					type: 'varchar',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'uuid'
				},
				{
					name: 'nome',
					type: 'varchar',
					length: '150'
				},
				{
					name: 'email',
					type: 'varchar',
					length: '150',
					isUnique: true
				},
				{
					name: 'senha',
					type: 'varchar',
				},
				{
					name: 'perfil',
					type: 'integer',
				},
				{
					name: 'dtcadastro',
					type: 'timestamp',
					default: 'now()'
				},
				{
					name: 'dadosconfirmados',
					type: 'boolean',
					default: false
				},
			]
		}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		
		await queryRunner.dropTable('usuario');
    }

}
