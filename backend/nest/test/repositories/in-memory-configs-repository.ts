import { Config } from '@application/entities/config';
import { ConfigsRepository } from '@application/repositories/configs-repository';

export class InMemoryConfigsRepository implements ConfigsRepository {
  private configs: Config[];

  constructor() {
    this.configs = [];
  }

  async create(config: Config): Promise<void> {
    this.configs.push(config);
  }

  async getConfig(): Promise<Config | null> {
    return this.configs.length > 0 ? this.configs[0] : null;
  }

  async updateConfig(config: Config): Promise<void> {
    const existingConfigIndex = this.configs.findIndex(
      (c) => c.id === config.id,
    );
    if (existingConfigIndex !== -1) {
      this.configs[existingConfigIndex] = config;
    }
  }

  async delete(configId: string): Promise<void> {
    this.configs = this.configs.filter((c) => c.id !== configId);
  }
}
