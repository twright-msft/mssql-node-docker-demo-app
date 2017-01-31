#start SQL Server, start the script to create the DB and import the data, start the app
/opt/mssql/bin/sqlservr.sh & /usr/src/app/import-data.sh & npm start 
