import { IsNotEmpty, MaxLength } from "class-validator";
import { Categoria } from "src/categoria/entities/categoria.entity";
import{Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne, OneToMany, JoinColumn} from "typeorm";


@Entity({name: "tb_produtos"})
    export class Produto{
        static id(id: any) {
            throw new Error("Method not implemented.");
        }


        @PrimaryGeneratedColumn()
        id: number

        @IsNotEmpty()
        @MaxLength(50)
        @Column({length: 50, nullable: false})
        nome: string

        @IsNotEmpty()
        @MaxLength(50)
        @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
        preco: number

        @IsNotEmpty()
        @MaxLength(50)
        @Column({length: 50, nullable: false})
        single_multi: string

        @IsNotEmpty()
        @MaxLength(30)
        @Column({length: 30, nullable: false})
        classInd: string

        
        @ManyToOne(() => Categoria, (categoria) => categoria.produto, {
            onDelete: "CASCADE"
        })
        @JoinColumn({})
        categoria: Categoria
    }