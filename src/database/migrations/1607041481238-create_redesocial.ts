import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createRedesocial1607041481238 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'redesocial',
			columns: [
				{
					name: 'idredesocial',
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
					name: 'nome',
					type: 'varchar',
				},
				{
					name: 'link',
					type: 'varchar'
				}
			]
		}));

		await queryRunner.createForeignKey('redesocial', new TableForeignKey({
			name:'redesocialCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('redesocial', 'redesocialCadastro');
		await queryRunner.dropTable('redesocial');
    }

}
