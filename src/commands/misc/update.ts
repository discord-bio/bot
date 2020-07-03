import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';
import { execSync } from 'child_process';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'update',
  requiredPermissions: ['ADMINISTRATOR'],
};

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    const msg = await message.sendMessage('<:github:669562305176141831> Pulling from Git');
    execSync('git pull');
    await msg.edit('<:ts:728674877829152889> Transpiling');
    execSync('tsc');
    await msg.edit('🔄 Restarting');
    process.exit(-1);
  }
}
