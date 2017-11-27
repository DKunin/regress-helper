'use strict';

const convict = require('convict');
const config = convict(require('./schema'));

const env = config.get('env');

// Custom formatting stuff
// var config = convict({
//   key: {
//     doc: "API key",
//     format: function check (val) {
//       if (!/^[a-fA-F0-9]{64}$/.test(val)) {
//         throw new Error('must be a 64 character hex key')
//       }
//     },
//     default: '3cec609c9bc601c047af917a544645c50caf8cd606806b4e0a23312441014deb'
//   }
// });

// convict.addFormat({
//   name: 'float-percent',
//   validate: function(val) {
//     if (val !== 0 && (!val || val > 1 || val < 0)) {
//       throw new Error('must be a float between 0 and 1, inclusive');
//     }
//   },
//   coerce: function(val) {
//     return parseFloat(val, 10);
//   }
// });

config.loadFile('./config/env/' + env + '.json');
config.validate({ allowed: 'strict' });
module.exports = config;
