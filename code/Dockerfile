
FROM ubuntu
MAINTAINER Korei Klein

RUN add-apt-repository ppa:chris-lea/node.js
RUN echo "deb http://us.archive.ubuntu.com/ubuntu/ precise universe" >> /etc/apt/sources.list
RUN apt-get update
RUN apt-get install -y nodejs

RUN sudo npm install -g rsvp

#CMD ["/usr/bin/node", "/app.js"]
