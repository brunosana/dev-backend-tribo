import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class createChampionshipTeams1604359168765
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'championshipTeams',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'championship',
                        type: 'uuid',
                    },
                    {
                        name: 'team',
                        type: 'uuid',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('championshipTeams');
    }
}
