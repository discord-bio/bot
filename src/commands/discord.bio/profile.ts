import { Command, CommandStore, CommandOptions, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';
import DiscordBioClient from '../../client';

const PingCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'profile'
};

export default class extends Command {
  constructor (store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, PingCommandOptions);
  }

  public async run (message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    const discordBioClient = (<DiscordBioClient> message.client).discordBioClient;
    const searchParam = message.content.split(' ')[1];
    let response;
    try {
      response = await discordBioClient.fetchUserDetails(searchParam).then(r => r.payload);
    } catch (e) {
      await message.channel.send(e.message);
      return null;
    }
    return await message.sendMessage(`User: ${response.discord.username}\nLikes: ${response.user.details.likes}`);
  }
}
