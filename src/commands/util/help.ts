import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';
import { prefix } from '../../../config.json';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'help',
  description: 'This command list'
};

export default class extends Command {
    public officialGuildOnly = false;

  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    return message.sendMessage({ embed: {
        title: 'Command List',
        description: message.client.commands.filter(c => (<any> c).officialGuildOnly === false).map(c => `**${prefix}${c.name}** - ${c.description}`).join('\n'),
        color: 0x800080
    }});
  }
}
