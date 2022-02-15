import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogEntity } from 'src/blogs/entities/blog.entity';




@Module({
    imports: [TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: '123',
        database: 'pet',
        // entities: ['**/*.entity{.ts, .js}'],
        // entities: [BlogEntity],
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
        logger: "advanced-console",
    })]
})


export class DatabaseModule {}
