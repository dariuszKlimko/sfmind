import http from "http";

export interface HttpServer {
  createServer(): http.Server;
}
