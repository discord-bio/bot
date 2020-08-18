import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions, SITE_URL, API_URL, BOT_INVITE } from '../../constants';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'links',
  description: 'Some useful discord.bio resources'
};

export default class extends Command {
    public officialGuildOnly = false;

  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    return message.sendMessage('', { embed: {
        title: 'Useful Links',
        color: 0x800080,
        description: `[Website](${SITE_URL})\n[API](${API_URL})\n[Discord](${BOT_INVITE})\n[Bot Invite](${BOT_INVITE})`,
        thumbnail: {
            url: 'https://cdn.discordapp.com/avatars/660184868772249610/cb8f1853728403ef77590cd967d3b4c4.webp'
        },
        timestamp: Date.now()
    }});
  }
}
