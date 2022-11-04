import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { CategoriaService } from "../service/categoria.service";

@Controller("/categoria")
export class CategoriaController {
    constructor(private readonly CategoriaService: CategoriaService) { }
    
    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(): Promise<Categoria[]> {
        return this.CategoriaService.findAll();
    }

    @Get("/:id")
    @HttpCode(HttpStatus.OK)
    findById(@Param('id', ParseIntPipe) id: number): Promise<Categoria> {
        return this.CategoriaService.findById(id)
    }

    @Get('/plataforma/:plataforma')
    @HttpCode(HttpStatus.OK)
    findByPlataforma(@Param('plataforma') plataforma: string): Promise<Categoria[]> {
        return this.CategoriaService.findByPlataforma(plataforma)
    }


    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() Categoria: Categoria): Promise<Categoria> {
        return this.CategoriaService.create(Categoria)
    }


    @Put()
    @HttpCode(HttpStatus.OK)
    update(@Body() Categoria: Categoria): Promise<Categoria> {
        return this.CategoriaService.update(Categoria)
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT)
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.CategoriaService.delete(id)
    }
}

