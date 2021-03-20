import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createAgenda1607040145458 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'agenda',
			columns: [
				{
					name: 'idagenda',
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
					name: 'dtagenda',
					type: 'timestamp',
				},
				{
					name: 'hora',
					type: 'varchar'
				},
				{
					name: 'local',
					type: 'varchar'
				}
			]
		}));

		await queryRunner.createForeignKey('agenda', new TableForeignKey({
			name:'agendaCadastro',
            columnNames: ['idcadastro'],
            referencedColumnNames: ['idcadastro'],
            referencedTableName: 'cadastro',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('agenda', 'agendaCadastro');
		await queryRunner.dropTable('agenda');
    }

}
