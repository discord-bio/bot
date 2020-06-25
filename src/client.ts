import { Client as KlasaClient, KlasaClientOptions } from 'klasa';

import { Client as DBioWrapClient } from 'dbiowrap/lib/src/client';
import { dBioWrapClientOptions } from './constants';

export default class DiscordBioClient extends KlasaClient {
    public discordBioClient: DBioWrapClient

    constructor (options: KlasaClientOptions) {
      super(options);
      this.discordBioClient = new DBioWrapClient(dBioWrapClientOptions);
    }
}
