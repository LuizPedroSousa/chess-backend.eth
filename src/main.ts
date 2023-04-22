import 'reflect-metadata';
import 'dotenv/config';
import 'express-async-errors';
import { cors } from '@config/cors';
import { InfraRegistrationDependencies } from '@shared/infra/InfraRegistrationDependencies';
import { errors } from 'celebrate';
import express, { Express as Application } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import { Server as HttpServer, createServer } from 'http';
import { ApplicationRegistrationDependencies } from '@shared/application/ApplicationRegistrationDependencies';
import { ExceptionHandler } from '@shared/infra/http/middlewares/ExceptionHandler';

class Main {
  public app: Application;
  public server: HttpServer;

  constructor() {
    this.app = express();

    this.server = createServer(this.app);
  }

  public async init(): Promise<void> {
    this.middlewares();

    await InfraRegistrationDependencies.registry(this.app);
    ApplicationRegistrationDependencies.registry();
    this.exceptionHandler();
  }

  private middlewares() {
    const limiter = rateLimit({
      windowMs: 60000,
      max: 100,
    });

    this.app.set('trust proxy', 1);
    this.app.use(limiter);
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(cors);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.static('public'));
  }

  private exceptionHandler(): void {
    this.app.use(errors());
    this.app.use(ExceptionHandler.handle);
  }

  public listen(): void {
    this.server.listen(process.env.PORT || 3333, () => {
      console.log(`--- Server started on port ${process.env.PORT || 3333} 🚀---`);
    });
  }
}

export const main = new Main();
