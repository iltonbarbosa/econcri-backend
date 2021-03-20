import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createBanda1607040642371 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'banda',
			columns: [
				{
					name: 'idbanda',
					type: 'varchar',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'uuid'
				},
				{
					name: 'idcadastro',
					type: 'varchar',
				},
				{
					name: 'estilo',
					type: 'varchar',
				},
				{
					name: 'autoral_cover',
					type: 'integer'
				},
				{
					name: 'num_integrantes',
					type: 'integer'
				},
				{
					name: 'nome_integrantes',
					type: 'varchar'
				}
			]
		}));

		await queryRunner.createForeignKey('banda', new TableForeignKey({
			name:'bandaCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('banda', 'bandaCadastro');
		await queryRunner.dropTable('banda');
    }

}
