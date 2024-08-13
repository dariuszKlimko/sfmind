import express from "express";
import http from "http";
import config from "config";
import "dotenv/config";
import { HttpServer } from "@app/interfaces/http.interface";

export class Http implements HttpServer {
  public app: express.Application;
  public configService: config.IConfig;

  constructor(app: express.Application, configService: config.IConfig) {
    this.app = app;
    this.configService = configService;
  }

  public createServer(): http.Server {
    return http.createServer(this.app).listen(this.configService.get("PORT"), () => {
      console.log("HTTP " + this.configService.get("PORT"));
    });
  }
}
