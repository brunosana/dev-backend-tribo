import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import Team from './Team';

@Entity('championships')
class Championship {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @Column()
    winnerId: string;

    @ManyToOne(() => Team)
    @JoinColumn({ name: 'winnerId' })
    winner: Team;

    @Column()
    start: Date;

    @Column()
    end: Date;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    teams: Team[];
}

export default Championship;
