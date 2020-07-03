import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';

import { TopLikes } from 'dbiowrap/lib/src/types';

import DiscordBioClient from '../../client';
import { MessageEmbed } from 'discord.js';

const FIELD_COUNT = 2;

const USER_LIMIT = 10;

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
      topUsers = await discordBioClient.fetchTopUsers();
    } catch (e) {
      return await message.sendMessage(e.message);
    }
    const payload = topUsers.payload;
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