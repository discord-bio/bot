import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions, BOT_INVITE } from '../../constants';

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
    return message.sendMessage(`Invite the bot with this link: <${BOT_INVITE}>`);
  }
}
