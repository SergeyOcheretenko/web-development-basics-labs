import { Sequelize } from 'sequelize-typescript';
import { Provider } from '@nestjs/common';
import { SEQUELIZE } from './database.constants';
import { ConfigService } from '../config/config.service';
import { User } from './entities/User';

export const databaseProviders: Provider[] = [
  {
    provide: SEQUELIZE,
    useFactory: async (configService: ConfigService) => {
      const config = configService.getDatabaseConfig();
      const sequelize = new Sequelize({
        ...config,
        define: {
          timestamps: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          underscored: true,
        },
      });

      sequelize.addModels([User]);
      await sequelize.sync({ alter: true });
      return sequelize;
    },
    inject: [ConfigService],
  },
];
