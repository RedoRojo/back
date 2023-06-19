import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Put } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from '../dto/create-post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postService: PostsService){}
    @Get()
    findAll()
    {
        return this.postService.showAll();
    }
    @Get(':id')
    findPostsForUserId(
        @Param('id',ParseIntPipe) id:number
    )
    {
        return this.postService.findPostsForUserId(id);
    }
    @Get('/unPost/:id')
    obtenerUnPost(
        @Param('id',ParseIntPipe) postId:number
    )
    {
        return this.postService.obtenerUnPost(postId);
    }
    @Post()
    create(@Body() createPostDto:CreatePostDto) :object
    {
        return this.postService.create(createPostDto);
    }

    @Put(':id')
    modifyUser(
        @Param('id',ParseIntPipe) id:number,
        @Body() postModify:CreatePostDto
    )
    {
        return this.postService.modifyPost(id,postModify);
    }
    @Delete(':id')
    deleteUser(@Param('id',ParseIntPipe) id:number)
    {
        return this.postService.deletePost(id);
    }
    @Patch(':id')
    modifyUserWithPatch(
        @Param('id',ParseIntPipe) id:number,
        @Body() postModify:CreatePostDto
    )
    {
        
        return this.postService.modifyPostWithPatch(id,postModify);
    }
}
