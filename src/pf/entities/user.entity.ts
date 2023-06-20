import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { RolName } from "./rol.enum";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id:number;
    
    @Column()
    nombre:string;
    
    @Column()
    apellido:string;
    
    @Column({nullable: false, unique:true})
    username:string;
    
    @Column()
    password:string;
    
    @OneToMany(()=>Post, post=>post.user)
    posts: Post[];
    
    @Column({type: 'varchar', length: 10, nullable: false})    
    rol: RolName;
    // @OneToMany(()=>Dog, dog=>dog.raza)
    // dogs: Dog[]
}
