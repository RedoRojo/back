import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dto/create-comment.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment) private commentRepository: Repository<Comment>
        ) {}
    
    
        async showAll():  Promise<Comment[]>
        {
        //    return this.postRepository.find();
            return this.commentRepository.find({ relations: ['post','post.user'] });
           
        }
        async findCommentForPostId(post:number):  Promise<Comment[]>
        {
            
            // return this.commentRepository.find({ relations: ['post','post.user'] });
            return this.commentRepository.find({ relations: ['post'], where: { post: { id: post } } });
               
        }
        // async showAll(): Promise<Post[]> {
        //     return this.postRepository.find({ relations: ['foreignKeyEntity'] });
        //   }
        
        // En este ejemplo, debes reemplazar 'foreignKeyEntity' con el nombre de la relación de clave externa que deseas cargar en tu entidad Post osea el nombre de la foranea en el entity Post. Al pasar { relations: ['foreignKeyEntity'] } como opción en el método find(), le indicas a TypeORM que cargue la relación de clave externa especificada junto con tus entidades Post.
//         where especifica las condiciones de búsqueda.
// post se refiere a la propiedad post en la entidad Comment.
// { id: post } es un objeto de consulta que establece que la propiedad id de la entidad post debe coincidir con el valor de la variable post que se pasa como argumento al método findCommentForPostId.
        create(createCommentDto:CreateCommentDto){
            
            return this.commentRepository.save(createCommentDto)
            
        }
    
        async modifyComment(id:number,createCommentDto:CreateCommentDto)
        {
            const commentFound=await this.commentRepository.findOne({
                where:{
                    id,
                },
            });
            if(!commentFound)
            {
                return new HttpException('comment not found',HttpStatus.NOT_FOUND);
            }
    
    
    
            // UserFound.nombre=createUserDto.nombre;
            // UserFound.apellido=createUserDto.apellido;
            // UserFound.passsword=createUserDto.password;
            
            

            this.commentRepository.update({id},createCommentDto)
            return commentFound
            
            // return this.UserRepository.save(UserFound)
        }
    
    
        async deleteComment(id:number)
        {
            const commentFound=await this.commentRepository.findOne({
                where:{
                    id,
                },
            });
            if(!commentFound)
            {
                return new HttpException('comment not found',HttpStatus.NOT_FOUND);
            }
            return this.commentRepository.delete(id);
        }
}
