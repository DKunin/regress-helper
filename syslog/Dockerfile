FROM gliderlabs/alpine

EXPOSE 515/udp

RUN apk --update add rsyslog && rm -rf /var/cache/apk/*

ADD rsyslog.conf /etc/rsyslog.conf

CMD ["rsyslogd", "-n"]