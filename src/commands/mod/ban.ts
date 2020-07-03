import { Command, CommandStore, CommandOptions, KlasaClient, KlasaMessage } from 'klasa';
import { DefaultCommandOptions } from '../../constants';

const MOD_ROLE = '661332732168765440';

const MILLISECONDS_IN_DAY = 86400000;

const BAN_LIMIT = 50;

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'ban',
};

export default class extends Command {
  private usesThisInterval = 0;
  private intervalReset = Date.now();

  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    if (!message.member?.roles.has(MOD_ROLE) && !message.member?.permissions.has('BAN_MEMBERS')) return null;
    const memberId = message.content.split(' ')[1];
    const member = message.guild?.members.get(memberId.replace(/[<|>|\@|\!]/g, ''));
    if (!member) return await message.sendMessage('Member not found');
    const reason = message.content.split(' ').slice(2).join(' ');
    await member.ban({
      reason: reason || 'No reason provided.',
    });
    if (this.usesThisInterval >= BAN_LIMIT) {
      return message.sendMessage(
        `The daily ban limit has been exceeded. It resets at: ${new Date(this.intervalReset).toUTCString()}.`,
      );
    }
    this.usesThisInterval++;
    return await message.sendMessage('Banned member!');
  }

  public async init(): Promise<any> {
    this.intervalReset += MILLISECONDS_IN_DAY;
    setInterval(() => {
      this.intervalReset += MILLISECONDS_IN_DAY;
      this.usesThisInterval = 0;
    }, MILLISECONDS_IN_DAY);
  }
}
