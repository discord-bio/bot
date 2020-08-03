import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';

import { TopLikes } from 'dbiowrap/lib/rest/types';

import { MessageEmbed } from 'discord.js';

import DiscordBioClient from '../../client';
import { RestClient } from 'dbiowrap/lib/rest/restclient';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'top',
};

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    const discordBioClient = (<DiscordBioClient>message.client).discordBioClient;
    let topUsers: TopLikes.Response;
    try {
      topUsers = await (<RestClient> discordBioClient.rest).fetchTopUsers();
    } catch (e) {
      return await message.sendMessage(e.message);
    }
    const payload = topUsers.payload.users;
    const users: typeof payload = payload.filter((i, index) => index < 10);

    const embed = new MessageEmbed().setTitle('❤️ **Top Likes**');
    users.forEach((obj, index) => {
      embed.addField(
        `**[${index + 1}]** ${obj.discord.username}#${obj.discord.discriminator}`,
        `${obj.user.likes} likes`,
      );
    });

    return await message.sendMessage(embed);
  }
}
