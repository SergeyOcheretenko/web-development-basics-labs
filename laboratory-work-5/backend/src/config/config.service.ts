import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import {
  IsNotEmpty,
  IsString,
  IsOptional,
  validateSync,
  IsEnum,
  IsNumber,
} from 'class-validator';
import { plainToClass, Transform } from 'class-transformer';
import { SequelizeOptions } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

export enum Environment {
  TEST = 'test',
  DEV = 'development',
  PROD = 'production',
}

export class EnvironmentVariables {
  @Transform(({ value }) => value.toLowerCase())
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV: Environment = Environment.DEV;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsOptional()
  PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_HOST: string;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  @IsNotEmpty()
  DB_PORT: number;

  @IsString()
  @IsNotEmpty()
  DB_USERNAME: string;

  @IsString()
  @IsNotEmpty()
  DB_PASSWORD: string;

  @IsString()
  @IsNotEmpty()
  DB_DIALECT: Dialect;

  @IsString()
  @IsNotEmpty()
  DB_NAME_TEST: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME_DEVELOPMENT: string;

  @IsString()
  @IsNotEmpty()
  DB_NAME_PRODUCTION: string;
}

@Injectable()
export class ConfigService implements OnModuleInit {
  constructor(@Inject('ENV') private env: EnvironmentVariables) {}

  async onModuleInit() {
    this.env = this.validateConfig();
  }

  public getEnvironment() {
    return this.env.NODE_ENV;
  }

  private getProductionDatabaseConfig(): SequelizeOptions {
    return {
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_NAME_PRODUCTION,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      dialect: this.env.DB_DIALECT,
    };
  }

  private getDevelopmentDatabaseConfig(): SequelizeOptions {
    return {
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_NAME_DEVELOPMENT,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      dialect: this.env.DB_DIALECT,
    };
  }

  private getTestDatabaseConfig(): SequelizeOptions {
    return {
      username: this.env.DB_USERNAME,
      password: this.env.DB_PASSWORD,
      database: this.env.DB_NAME_TEST,
      host: this.env.DB_HOST,
      port: this.env.DB_PORT,
      dialect: this.env.DB_DIALECT,
    };
  }

  public getDatabaseConfig(): SequelizeOptions {
    switch (this.env.NODE_ENV) {
      case Environment.PROD:
        return this.getProductionDatabaseConfig();
      case Environment.DEV:
        return this.getDevelopmentDatabaseConfig();
      case Environment.TEST:
        return this.getTestDatabaseConfig();
      default:
        return this.getDevelopmentDatabaseConfig();
    }
  }

  private validateConfig() {
    const validatedConfig = plainToClass(EnvironmentVariables, this.env, {
      enableImplicitConversion: true,
    });
    const errors = validateSync(validatedConfig, {
      skipMissingProperties: false,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }
    return validatedConfig;
  }
}
