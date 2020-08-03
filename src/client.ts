import { Client as KlasaClient, KlasaClientOptions } from 'klasa';

import { Guild, TextChannel, EmbedField } from 'discord.js';

import { Client as DBioWrapClient } from 'dbiowrap/lib/client';
import { dBioWrapClientOptions } from './constants';

import { prefix } from '../config.json';

export default class DiscordBioClient extends KlasaClient {
  public discordBioClient: DBioWrapClient;

  constructor(options: KlasaClientOptions) {
    super(options);
    this.discordBioClient = new DBioWrapClient(dBioWrapClientOptions);
    this.on('guildCreate', this._onJoin.bind(this));
    this.on('ready', () => { this._onJoin(<Guild> this.guilds.get('541033778655526912')); });
  }

  _onJoin(guild: Guild) {
    const channels = guild.channels;
    const channelToSend = channels.find(c => c.name === 'general' || c.name === 'chat');
    if(!channelToSend || !(channelToSend instanceof TextChannel)) return;
    const fields: EmbedField[] = [];
    this.commands.forEach(c => {
      if((<any> c).officialGuildOnly === false && c.name !== 'help') {
        fields.push({
          name: `${prefix}${c.name}`,
          value: <string> c.description,
          inline: true
        });
      }
    });
    channelToSend.send({ embed: {
      title: "👋 Thanks for adding us to your server!",
      description: "You can now view **discord.bio profiles** and the **top liked profiles** directly in your server.",
      fields,
      color: 0xb300ff,
      footer: {
        text: "discord.bio"
      }
    }});
  }
}
