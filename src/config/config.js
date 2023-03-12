import path from 'path';
import dotenv from 'dotenv';
dotenv.config();
const __dirname = new URL('.', import.meta.url).pathname;

class BaseConfig {
  DEBUG = false;
  BASE_PATH = '/';
  SERVER_PROTOCOL = 'http';
  SERVER_IP = '127.0.0.1';
  SERVER_PORT = 8000;
  SECRET_KEY = process.env.SECRET_KEY;
}

class DevelopmentConfig extends BaseConfig {
  constructor() {
    super();
    // DEBUGGING
    this.DEBUG = true;
    // SERVER INFO
    this.SERVER_IP = '0.0.0.0';
    this.SERVER_PORT = process.env.PORT || 8000;
    // PATH
    this.BASE_PATH = path.resolve(__dirname, '..');
    this.STORAGE_PATH = path.join(this.BASE_PATH, 'storage');
    this.LOGS_PATH = path.join(this.BASE_PATH, 'logs');
    // MONGO PATH
    // Load environment variables from .env file
    this.MONGO_URI = process.env.MONGO_URI;
    // DB_NAME
    this.DB_NAME = process.env.DB_NAME;
  }
}

class ProductionConfig extends BaseConfig {}

function loadConfig() {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'development':
      return new DevelopmentConfig();
    case 'production':
      return new ProductionConfig();
    default:
      return new DevelopmentConfig();
  }
}

export default loadConfig();
