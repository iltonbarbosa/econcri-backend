import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createCantor1607042124882 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'cantor',
			columns: [
				{
					name: 'idcantor',
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
				}
			]
		}));

		await queryRunner.createForeignKey('cantor', new TableForeignKey({
			name:'cantorCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('cantor', 'cantorCadastro');
		await queryRunner.dropTable('cantor');
    }

}
