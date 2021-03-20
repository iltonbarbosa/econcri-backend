import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createEmpresa1607041005798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'empresa',
			columns: [
				{
					name: 'idempresa',
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
					name: 'cnpj',
					type: 'varchar',
				}
			]
		}));

		await queryRunner.createForeignKey('empresa', new TableForeignKey({
			name:'empresaCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('empresa', 'empresaCadastro');
		await queryRunner.dropTable('empresa');
    }

}
