import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity('teams')
class Team {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    logo: string;

    @Column()
    player1: string;

    @Column()
    player2: string;

    @Column()
    player3: string;

    @Column()
    player4: string;

    @Column()
    player5: string;

    @Column()
    coach: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}

export default Team;
