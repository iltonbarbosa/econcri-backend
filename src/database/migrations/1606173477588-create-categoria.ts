import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategoria1606173477588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'categoria',
			columns: [
				{
					name: 'idcategoria',
					type: 'varchar',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'uuid'
				},
				{
					name: 'descricao',
					type: 'varchar',
				}
			]
		}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('categoria');
    }

}
