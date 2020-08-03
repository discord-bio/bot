import { Command, CommandStore, CommandOptions, KlasaMessage } from 'klasa';
import { DefaultCommandOptions, SUGGESTION_CHANNEL_ID } from '../../constants';
import { TextChannel } from 'discord.js';

const ThisCommandOptions: CommandOptions = {
  ...DefaultCommandOptions,
  name: 'suggest',
};

export default class extends Command {
  constructor(store: CommandStore, file: string[], directory: string) {
    super(store, file, directory, ThisCommandOptions);
  }

  public async run(message: KlasaMessage): Promise<KlasaMessage | KlasaMessage[] | null> {
    const content = message.content;
    if (!content) {
      return message.sendMessage('No suggestion provided.');
    } else {
        const suggestion = content.split(' ').slice(1).join(" ");
        if(suggestion.trim().length === 0) return message.sendMessage('<:dBoxCross:707177937375461397> You need to provide a suggestion to send.');
        const suggestionChannel = message.client.channels.get(SUGGESTION_CHANNEL_ID);
        if(!suggestionChannel) throw new Error('No channel found');
        return (<KlasaMessage> <unknown> (<TextChannel> suggestionChannel).send('', { embed: {
            author: {
              name: message.author.username,
              iconURL: message.author.avatarURL() || undefined
            },
            color: 0xFFFF00,
            description: `**Suggestion**\n${suggestion}`,
            fields: [
              {
                name: '**Status**',
                value: 'Pending',
                inline: false
              }
            ],
            timestamp: new Date()
        }}).then(() => {
          message.sendMessage('<:dBoxCheck:707177937966989353> Your suggestion was submitted.');
        }));
    }
  }
}
