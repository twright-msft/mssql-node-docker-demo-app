FROM microsoft/mssql-server-linux:latest

# Set this so that it skips prompting you during the mssql-tools package install
ENV ACCEPT_EULA=Y

# Install node/npm
RUN apt-get -y update  && \
        apt-get install -y curl && \
        curl -sL https://deb.nodesource.com/setup_6.x | bash - && \
        apt-get install -y nodejs

# Install the mssql-tools package which contains sqlcmd and bcp utilities
RUN curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
        curl https://packages.microsoft.com/config/ubuntu/16.04/prod.list | tee /etc/apt/sources.list.d/msprod.list && \
        apt-get update && \
        apt-get install -y mssql-tools && \
        ln -sfn /opt/mssql-tools/bin/sqlcmd-13.0.1.0 /usr/bin/sqlcmd && \
        ln -sfn /opt/mssql-tools/bin/bcp-13.0.1.0 /usr/bin/bcp

RUN locale-gen en_US.UTF-8 && \
        update-locale

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

# Grant permissions for the import-data script to be executable
RUN chmod +x /usr/src/app/import-data.sh

EXPOSE 8080

CMD /bin/bash ./entrypoint.sh