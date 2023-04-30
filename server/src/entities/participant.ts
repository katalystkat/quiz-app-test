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

    // verifyPassword(password: string) {
    //     console.log('hashed password: '+ this.hashPassword)
    //     console.log('salt: '+ this.salt)
    //     return bcrypt.compareSync(password, this.hashPassword);
    // }
    
    verifyPassword(password: string) {
        console.log('salt: '+this.salt)
        console.log('password: '+ password);
        const hashPassword = bcrypt.hashSync(password ?? '', this.salt);
        // const hashPassword = bcrypt.hashSync(password ?? '', this.salt);
        console.log('hashed password: '+ hashPassword)
        const hash = bcrypt.compareSync(password, this.salt);
        return hash;
    }

    validateFields() {
        if (!this.username || !this.hashPassword || !this.salt) {
            throw new Error('Missing required fields');
        }
    }
}
