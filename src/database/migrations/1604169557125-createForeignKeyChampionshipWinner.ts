import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class createForeignKeyChampionshipWinner1604169557125
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createForeignKey(
            'championships',
            new TableForeignKey({
                name: 'ChampionshipTeam',
                columnNames: ['winnerId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'teams',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('championships', 'ChampionshipTeam');
    }
}
