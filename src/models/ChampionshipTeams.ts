import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('championshipTeams')
class ChampionshipTeams {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    championship: string;

    @Column()
    team: string;
}

export default ChampionshipTeams;
