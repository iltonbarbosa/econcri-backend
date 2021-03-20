import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createLinkvideo1607039216092 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'linkvideo',
			columns: [
				{
					name: 'idlinkvideo',
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
					name: 'link',
					type: 'varchar',
				}
			]
		}));

		await queryRunner.createForeignKey('linkvideo', new TableForeignKey({
			name:'linkvideoCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('linkvideo', 'linkvideoCadastro');
		await queryRunner.dropTable('linkvideo');
    }

}
