import { KlasaClientOptions, CommandOptions } from 'klasa';

import config from '../config.json';
import { ClientOptions as dBioClientOptions } from 'dbiowrap/lib/client';

export const COMMAND_MESSAGE_LIFETIME = 30000;

export const DISABLED_STOCK_COMMANDS = ['stats', 'info'];

export const SUGGESTION_CHANNEL_ID = "661333033655468033";

export const DBIO_GUILD = "661331961188712459";

export const ClientOptions: KlasaClientOptions = {
  prefix: config.prefix,
  fetchAllMembers: false,
  owners: config.owners,
  commandEditing: true,
  commandMessageLifetime: COMMAND_MESSAGE_LIFETIME
};

export const dBioWrapClientOptions: dBioClientOptions = {
  cache: {
    userProfiles: {
      expire: 60000,
      limit: 10
    }
  }
};

export enum CommandRunInTypes {
    TEXT = 'text',
    DM = 'dm'
}

export const DefaultCommandOptions: CommandOptions = {
  runIn: [CommandRunInTypes.TEXT, CommandRunInTypes.DM],
  bucket: 1,
  cooldown: 3,
  deletable: true,
  description: 'No description found',
  enabled: true,
  extendedHelp: 'No help found',
  guarded: true,
  nsfw: false,
  permissionLevel: 0,
  promptLimit: 0,
  quotedStringSupport: false,
  requiredPermissions: [],
  requiredSettings: [],
  subcommands: false,
  usage: '',
  usageDelim: ' ',
};


export const API_URL = 'https://api.discord.bio/';
export const SITE_URL = 'https://discord.bio/';
export const DISCORD_SERVER_INVITE = 'https://discord.gg/bWSxwz8';
export const BOT_INVITE = 'https://discord.com/api/oauth2/authorize?client_id=660184868772249610&permissions=8&scope=bot';