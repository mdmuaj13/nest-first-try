import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BlogsModule } from './blogs/blogs.module';
import { ProductsModule } from './products/products.module';
import { DatabaseModule } from './database/database.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';

@Module({
  imports: [BlogsModule, ProductsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService , 
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
],
})
export class AppModule {}
