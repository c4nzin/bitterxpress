import express, { Express } from 'express';

export class Application {
  private static app: Express;

  public static getInstance(): Express {
    if (!Application.app) {
      Application.app = express();
    }
    return Application.app;
  }
}
