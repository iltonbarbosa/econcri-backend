import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createRelease1607041840342 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'release',
			columns: [
				{
					name: 'idrelease',
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
					name: 'release',
					type: 'text',
				},
				{
					name: 'linkportfolio',
					type: 'varchar'
				},
				{
					name: 'palavraschave',
					type: 'varchar'
				}
			]
		}));

		await queryRunner.createForeignKey('release', new TableForeignKey({
			name:'releaseCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('release', 'releaseCadastro');
		await queryRunner.dropTable('release');
    }

}
