import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createForeignKeysChampionshipTeams1604360194403
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKeys('championshipTeams', [
            new TableForeignKey({
                name: 'championshipTeamsTeam',
                columnNames: ['team'],
                referencedColumnNames: ['id'],
                referencedTableName: 'teams',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                name: 'championshipTeamsChampionship',
                columnNames: ['championship'],
                referencedColumnNames: ['id'],
                referencedTableName: 'championships',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(
            'championshipTeams',
            'championshipTeamsTeam',
        );
        await queryRunner.dropForeignKey(
            'championshipTeams',
            'championshipTeamsChampionship',
        );
    }
}
