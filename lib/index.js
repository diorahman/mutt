/** @module Index */
import { install } from 'source-map-support'; install();

import Mutt from './mutt';
import { MuttError } from './error.js';

// Exposes main entrypoint to the lib.
export default Mutt;

// Exposes the lib error.
export { MuttError };
