import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'invite',
  description: 'Get the URL to invite the bot'
};

export default class extends Command {
  public officialGuildOnly = false;

  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    return message.sendMessage('Invite the bot with this link: <https://discord.com/api/oauth2/authorize?client_id=660184868772249610&permissions=8&scope=bot>');
  }
}
