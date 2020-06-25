import { ClientOptions, DISABLED_STOCK_COMMANDS } from './constants';
import { token } from '../config.json';
import DiscordBioClient from './client';

const client = new DiscordBioClient(ClientOptions);

(async () => {
  await client.login(token).then(() => {
    DISABLED_STOCK_COMMANDS.forEach(command => {
      const c = client.commands.get(command);
      if (c) {
        c.disable();
        c.hidden = true;
      }
    });
  });
})();
