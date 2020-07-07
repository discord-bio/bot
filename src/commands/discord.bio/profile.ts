/* eslint-disable no-irregular-whitespace */
import { Command, CommandStore, CommandOptions, KlasaMessage, KlasaUser } from 'klasa';
import { MessageEmbed } from 'discord.js';
import { DefaultCommandOptions } from '../../constants';
import DiscordBioClient from '../../client';
import moment from 'moment';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'profile',
  aliases: ['p', 'bio'],
  usage: '[profile:string]',
};

enum Gender {
  'Male',
  'Female',
  'Non-binary',
}

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage, [profile]: any): Promise<KlasaMessage | KlasaMessage[] | null> {
    if (!profile) profile = message.author.id;
    profile = profile.replace(/[\\<>@#&!]/g, '');

    const discordBioClient = (<DiscordBioClient>message.client).discordBioClient;
    let response;
    try {
      response = await discordBioClient.fetchUserDetails(profile).then((r) => r.payload);
    } catch (e) {
      return await message.sendMessage(e.message);
    }
    const { user, discord } = response;
    const name = `${discord.username}#${discord.discriminator}`;
    const url = `https://discord.bio/p/${user.details.slug}`;
    const avatar = discord.avatar
      ? `https://cdn.discordapp.com/avatars/${discord.id}/${discord.avatar}.png?size=256`
      : null;

    const embed = new MessageEmbed();
    embed.setColor('PURPLE');
    embed.setAuthor(name, avatar || undefined, url);
    if (avatar) embed.setThumbnail(avatar);
    if (user.details.banner) embed.setImage(user.details.banner);
    embed.setTitle(`${name} \`(${user.details.slug})\``);
    embed.setDescription(
      `🗒️**About:** ${user.details.description || 'No about set.'}\n​❤️ **${user.details.likes} like${
        user.details.likes !== 1 ? 's' : ''
      }**\n​`,
    );
    embed.addField('🆔 User ID', discord.id);
    embed.addField('🗺️ Location', user.details.location || 'No location', true);
    embed.addField(
      '🎂 Birthday',
      user.details.birthday ? moment(new Date(user.details.birthday)).format('MMM Do YYYY') : 'No birthday',
      true,
    );
    embed.addField('🚻 Gender', user.details.gender !== null ? Gender[user.details.gender] : 'No gender', true);
    embed.addField('✉️ Mail', user.details.email || 'No email', true);
    embed.addField('🛠️ Occupation', user.details.occupation || 'No occupation', true);
    embed.addField(
      '🗓️ Account Created',
      moment(user.details.created_at).format('MMMM Do YYYY, h:mm:ss a') || 'No creation date.',
      true,
    );

    return message.send(embed);
  }
}
