import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoriaModule } from './categoria/categoria.module';
import { Categoria } from './categoria/entities/categoria.entity';
import { Produto } from './produto/entities/produto.entity';
import { ProdutoModule } from './produto/produto.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'rootroot',
    database: 'db_lojagamer',
    entities: [Produto, Categoria],
    synchronize: true
    }),
      ProdutoModule,
      CategoriaModule
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
