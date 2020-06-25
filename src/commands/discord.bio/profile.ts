import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
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

  public async run (message: KlasaMessage, args: any[]): Promise<KlasaMessage | KlasaMessage[] | null> {
    const discordBioClient = (<DiscordBioClient> message.client).discordBioClient;
    let response;
    try {
      console.log(args);
      response = await discordBioClient.fetchUserDetails(args[0]).then(r => r.payload);
    } catch (e) {
      await message.channel.send(e.message);
      return null;
    }
    return await message.sendMessage(`User: ${response.discord.username}\nLikes: ${response.user.details.likes}`);
  }
}
