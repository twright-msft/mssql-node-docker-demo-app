#wait for the SQL Server to come up
sleep 60s

#run the setup script to create the DB and the schema in the DB
sqlcmd -S localhost -U sa -P Yukon900 -d master -i setup.sql

#import the data from teh csv file
bcp DemoData.dbo.Products in "/usr/src/app/Products.csv" -c -t',' -S localhost -U sa -P Yukon900