import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Categoria } from "../entities/categoria.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";


@Injectable()
export class CategoriaService {
 
    constructor  (
        @InjectRepository(Categoria)
        public categoriaRepository: Repository<Categoria>
    ) {}
 
 async findAll(): Promise<Categoria[]>{
    return await this.categoriaRepository.find({
         relations: {
             produto: true
         }
    })
}
 
 async findById(id: number): Promise<Categoria> {
    let categoria = await this.categoriaRepository.findOne({
         where: {
             id
         },
         relations: {
             produto: true
         }
    })
   
    if (!categoria)
    throw new HttpException('Categoria não existe', HttpStatus.NOT_FOUND)
    return categoria
}
 
async findByPlataforma(plataforma: string): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
         where: {
             plataforma: ILike(`%${plataforma}%`)
         },
         relations: {
             produto: true
         }
    })
 
}
 
async create(categoria: Categoria): Promise<Categoria> {
    return await this.categoriaRepository.save(categoria)
}
async update(categoria: Categoria): Promise<Categoria> {
    let buscarCategoria = await this.findById(categoria.id)
   
    if (!buscarCategoria || !categoria.id)
    throw new HttpException('Categoria não existe', HttpStatus.NOT_FOUND)
    return await this.categoriaRepository.save(categoria)
}
async delete (id: number): Promise<DeleteResult> {
    let buscarCategoria = await this.findById(id)
 
    if (!buscarCategoria)
    throw new HttpException ('Categoria não encontrado', HttpStatus.NOT_FOUND)
    return await this.categoriaRepository.delete(id)
}
}

