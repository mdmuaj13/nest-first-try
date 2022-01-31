import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [BlogsModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
