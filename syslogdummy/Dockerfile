FROM gliderlabs/alpine

EXPOSE 514/udp

RUN apk --update add rsyslog && rm -rf /var/cache/apk/*

ADD rsyslog.conf /etc/rsyslog.conf

CMD ["rsyslogd", "-n"]