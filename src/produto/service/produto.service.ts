import { Injectable } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common/enums";
import { HttpException } from "@nestjs/common/exceptions";
import { InjectRepository } from "@nestjs/typeorm";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Produto } from "../entities/produto.entity";

@Injectable()
export class ProdutoService {

    constructor(
        @InjectRepository(Produto)
        public produtoRepository: Repository<Produto>
    ) { }

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
             relations: {
                 categoria: true
             }
        })
    }


    async findById(id: number): Promise<Produto> {

        let produto = await this.produtoRepository.findOne({
             where: {
                 id
             },
             relations: {
                 categoria: true
             }
        })

        if (!Produto)
            throw new HttpException('Produto não existe', HttpStatus.NOT_FOUND)

        return produto
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
             where: {
                 nome: ILike(`%${nome}%`)
             },
             relations: {
                 categoria: true
             }
        })
    }

    async create(produto: Produto): Promise<Produto>{
        return await this.produtoRepository.save(produto)
    }

    async update(produto: Produto): Promise<Produto> {
        let buscarProduto = await this.findById(produto.id)

        if(!buscarProduto || !Produto.id)
            throw new HttpException('Produto Não Existe', HttpStatus.NOT_FOUND)

            return await this.produtoRepository.save(produto)
    }


    async delete(id: number): Promise<DeleteResult> {
        let buscarProduto = await this.findById(id)

        if(!buscarProduto)
            throw new HttpException('Produto não encontrado', HttpStatus.NOT_FOUND)

        return await this.produtoRepository.delete(id)
    }


}