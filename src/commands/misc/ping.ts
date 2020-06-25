import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';

const PingCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'ping'
};

export default class extends Command {
  constructor (store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, PingCommandOptions);
  }

  public run (message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    const start = Date.now();
    return message.channel.send('Pong').then(res => res.edit(`Pong: ${Date.now() - start}ms`));
  }
}
