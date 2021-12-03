FROM mcr.microsoft.com/mssql/server

# Switch to root user for access to apt-get install
USER root

# Helpful aliases
RUN echo 'alias ll='"'"'ls $LS_OPTIONS -al'"'"'' >> /etc/bash.bashrc 

# Install node/npm
RUN apt-get -y update  && \
        apt-get install -y curl && \
        curl -sL https://deb.nodesource.com/setup_14.x | bash - && \
        apt-get install -y nodejs && \
        apt-get install -y dos2unix

# Install tedious, the driver for SQL Server for Node.js
RUN npm install tedious

# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

RUN dos2unix *

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/src/app/import-data.sh

EXPOSE 8080

# Switch back to mssql user and run the entrypoint script
USER mssql
ENTRYPOINT /bin/bash ./entrypoint.sh
