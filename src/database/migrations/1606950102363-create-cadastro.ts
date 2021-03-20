import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class createCadastro1606950102363 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

		await queryRunner.createTable(new Table({
			name: 'cadastro',
			columns: [
				{
					name: 'idcadastro',
					type: 'varchar',
					isPrimary: true,
					isGenerated: true,
					generationStrategy: 'uuid'
				},
				{
					name: 'idcategoria',
					type: 'varchar',
				},
				{
					name: 'idusuario',
					type: 'varchar',
				},
				{
					name: 'nome',
					type: 'varchar',
					length: '150',
				},
				{
					name: 'cidade',
					type: 'varchar',
					length: '150',
				},
				{
					name: 'tempo_atuacao',
					type: 'varchar',
					length: '20'
				},
				{
                    name: 'latitude',
                    type: 'decimal(18, 18)',
					isNullable: true
                },
                {
                    name: 'longitude',
                    type: 'decimal(18, 18)',
					isNullable: true
				},
				{
					name: 'nome_contato',
					type: 'varchar',
					length: '150',
				},
				{
					name: 'telefone_contato',
					type: 'varchar',
					length: '50',
				},
				{
					name: 'email_contato',
					type: 'varchar',
					length: '150',
				},
				{
					name: 'dtcadastro',
					type: 'timestamp',
					default: 'now()'
				},

			],
		}));

		await queryRunner.createForeignKey('cadastro', new TableForeignKey({
			name:'cadastroCategoria',
            columnNames: ['idcategoria'],
            referencedColumnNames: ['idcategoria'],
            referencedTableName: 'categoria',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
		}));

		await queryRunner.createForeignKey('cadastro', new TableForeignKey({
			name:'cadastroUsuario',
            columnNames: ['idusuario'],
            referencedColumnNames: ['idusuario'],
            referencedTableName: 'usuario',
			onDelete: 'CASCADE',
			onUpdate: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropForeignKey('cadastro', 'cadastroUsuario');
		await queryRunner.dropForeignKey('cadastro', 'cadastroCategoria');
		await queryRunner.dropTable('cadastro');
    }

}
