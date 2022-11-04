import { IsNotEmpty, MaxLength } from "class-validator";
import { Produto } from "src/produto/entities/produto.entity";
import{Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany} from "typeorm";

@Entity({name: "tb_categorias"})
    export class Categoria{


        @PrimaryGeneratedColumn()
        id: number

        @IsNotEmpty()
        @MaxLength(30)
        @Column({length: 30, nullable: false})
        plataforma: string

        @IsNotEmpty()
        @MaxLength(30)
        @Column({length: 30, nullable: false})
        genero: string

        
        @OneToMany(() => Produto, (produto) => produto.categoria)
        produto: Produto
    }

