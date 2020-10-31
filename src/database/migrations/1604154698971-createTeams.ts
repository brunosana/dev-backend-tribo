import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createTeams1604154698971 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'teams',
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'logo',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'player1',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'player2',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'player3',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'player4',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'player5',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'coach',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: 'createdAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('teams');
    }
}
