import { Storage } from '@ra-lib/util';
import packageJson from '../../package.json';

export default new Storage({ prefix: `${packageJson.name}_` });
