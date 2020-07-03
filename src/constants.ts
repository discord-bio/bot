import { KlasaClientOptions, CommandOptions } from 'klasa';

import config from '../config.json';
import { ClientOptions as dBioClientOptions } from 'dbiowrap/lib/src/client';

export const COMMAND_MESSAGE_LIFETIME = 30000;

export const DISABLED_STOCK_COMMANDS = ['stats', 'info'];

export const SUGGESTION_CHANNEL_ID = "661333033655468033";

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
  usageDelim: ' '
};
