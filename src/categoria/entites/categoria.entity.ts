import { IsNotEmpty, MaxLength } from "class-validator";
import { Produto } from "src/produto/entites/produto.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name: "tb_categoria"})
    export class Categoria{
        @PrimaryGeneratedColumn()
        id:number

        @IsNotEmpty()
        @MaxLength(25)
        @Column({length:50, nullable:false})
        selecionado: string

        @OneToMany(() => Produto, (Produto) => Produto.categoria)
        produto: Produto[]
    }