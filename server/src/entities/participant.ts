import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';

@Entity()
export class Participant {
    @PrimaryGeneratedColumn('uuid')
    id!: string;

    @CreateDateColumn({ nullable: false })
    createdAt!: Date;

    @Column({ type: 'varchar', length: 20, unique: true })
    username!: string;

    @Column({ nullable: false})
    email!: string; 

    @Column({ nullable: false })
    hashPassword!: string;

    @Column({ nullable: false })
    salt!: string;
    
    setPassword(password: string) {
        this.salt = bcrypt.genSaltSync(12);
        this.hashPassword = bcrypt.hashSync(password, this.salt);
    }
    
    verifyPassword(password: string) {
        const hash = bcrypt.hashSync(password, this.salt);
        return hash === this.hashPassword;
    }

    validateFields() {
        if (!this.username || !this.hashPassword || !this.salt) {
            throw new Error('Missing required fields');
        }
    }
}
