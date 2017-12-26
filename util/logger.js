const bunyan = require('bunyan');
const bsyslog = require('bunyan-syslog-udp');

module.exports = config => {
    const logger = bunyan.createLogger({ name: 'workshop' });
    const udbConfig = config.get('logger');
    // logger streams, add to array

    logger.addStream({
        type: 'raw',
        level: config.get('logger.level'),
        stream: bsyslog.createBunyanStream(udbConfig)
    });

    return logger;
};
