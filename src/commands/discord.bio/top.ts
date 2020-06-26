import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';

import { TopLikes } from 'dbiowrap/lib/src/types';

import DiscordBioClient from '../../client';
import { EmbedField } from 'discord.js';

const FIELD_COUNT = 2;

const USER_LIMIT = 10;

const PingCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'top'
};

export default class extends Command {
  constructor (store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, PingCommandOptions);
  }

  public async run (message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    const discordBioClient = (<DiscordBioClient> message.client).discordBioClient;
    let topUsers: TopLikes.Response;
    try {
        topUsers = await discordBioClient.fetchTopUsers();
    } catch(e) {
        return await message.sendMessage(e.message);
    }
    const payload = topUsers.payload;
    const users = payload.map(u => `${u.discord.username} - ${u.user.likes}`).slice(0, USER_LIMIT + 1);
    const fields: EmbedField[] = [];
    for(let i = 0; i < FIELD_COUNT; i++) {
      const setSize = Math.floor(users.length / FIELD_COUNT);
      const fieldUsers = users.slice(i * setSize, (i * setSize) + setSize);
      fields.push({
        name: `Username - Likes (${(i + 1)})`,
        value: fieldUsers.join('\n'),
        inline: true
      });
    }
    return await message.sendMessage('', { embed: {
      fields
    }});
  }
}
