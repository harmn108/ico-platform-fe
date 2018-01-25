// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

import { ARCWORK_NETWORK_WSPATH, ARCWORK_URL, CHAIN_ID, GA_UA } from './parameters';

export const environment = {
    production: false,
    arcwork_network_wspath: ARCWORK_NETWORK_WSPATH,
    arcwork_url: ARCWORK_URL,
    // ipfs_server: IPFS_SERVER,
    // ipfs_port: IPFS_PORT,
    chain_id: CHAIN_ID,
    ga_ua: GA_UA
};
