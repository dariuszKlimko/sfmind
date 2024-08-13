export interface DbOperationsInterface {
  dbSync(): Promise<void>;
  dbInit(): Promise<void>;
  dbClose(): Promise<void>;
}
