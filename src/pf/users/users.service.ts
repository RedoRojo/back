import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>
        ) {}
    
    
        async showAll():  Promise<User[]>
        {
           return this.userRepository.find();
        }

        async getOneUser(id: number)
        {
            const userFound =  this.userRepository.findOne({
                where: {
                    id
                }
            }); 

            if(!userFound)
            {
                return new HttpException('user not found',HttpStatus.NOT_FOUND);
            }

            return userFound;   
        }

        async findOne(username: string): Promise<User | undefined> { 
            
            console.log(username);
            const userFound =  this.userRepository.findOne({
                where: {
                    username: username
                }
            }); 

            if(!userFound) {
                throw new HttpException('user not found',HttpStatus.NOT_FOUND);
            }
            return userFound; 
        }

        create(createUserDto:CreateUserDto){
            
            return this.userRepository.save(createUserDto)
            
        }
    
        async modifyUser(id:number,createUserDto:CreateUserDto)
        {
            const userFound=await this.userRepository.findOne({
                where:{
                    id,
                },
            });
            if(!userFound)
            {
                return new HttpException('User not found',HttpStatus.NOT_FOUND);
            }
    
            return this.userRepository.update({id},createUserDto)
    
        }
    
    
        async deleteUser(id:number)
        {
            const userFound=await this.userRepository.findOne({
                where:{
                    id,
                },
            });
            if(!userFound)
            {
                return new HttpException('User not found',HttpStatus.NOT_FOUND);
            }
            return this.userRepository.delete(id);
        }
}
