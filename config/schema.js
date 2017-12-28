module.exports = {
    env: {
        doc: 'enviroement in which the app is running',
        format: ['production', 'development'],
        default: 'production',
        env: 'APP_ENV'
    },
    port: {
        doc: 'port of the app',
        format: 'port',
        default: 8080,
        env: 'PORT'
    },
    db: {
        port: {
            doc: 'port of the mysql',
            format: 'port',
            default: 3306,
            env: 'DB_PORT'
        },
        user: {
            doc: 'default user',
            format: String,
            default: 'root',
            env: 'DB_USER'
        },
        password: {
            doc: 'default user password',
            format: String,
            default: 'secret',
            env: 'DB_PASSWORD'
        },
        host: {
            doc: 'default host',
            format: String,
            default: 'localhost',
            // default to null, to crach
            env: 'DB_HOST'
        },
        multipleStatements: {
            doc: 'multipleStatements value',
            format: Boolean,
            default: true,
            env: 'DB_MTLP_STAT'
        }
    },
    logger: {
        name: {
            doc: '',
            format: String,
            default: 'udptest',
            env: 'SYSLOG_NAME'
        },
        host: {
            doc: '',
            format: String,
            default: 'localhost',
            env: 'SYSLOG_HOST'
        },
        port: {
            doc: 'port',
            format: 'port',
            default: 515,
            env: 'SYSLOG_PORT'
        },
        facility: {
            doc: '',
            format: String,
            default: 'user',
            env: 'SYSLOG_FACILITY'
        },
        level: {
            doc: 'logger level',
            format: String,
            default: 'trace',
            env: 'SYSLOG_LEVEL'
        }
    }
};
