import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { JwtModule } from '@nestjs/jwt/dist';
import { jwtConstants } from './auth/constants';

@Module({
    imports:[
        TypeOrmModule.forFeature([User,Post,Comment]),
        JwtModule.register({
            global: true,
            secret: jwtConstants.secret,
            signOptions: {expiresIn: '60s'}
        })
    ],
    controllers: [UsersController, PostsController, CommentsController, AuthController],
    providers: [UsersService, PostsService, CommentsService, AuthService]
})
export class PfModule {}

