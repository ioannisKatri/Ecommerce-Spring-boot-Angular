# tells the terminal that we are using bash shell


# building the project
mvn install

# if the file doesn't exist, try to create folder
if [ ! -e ./.docker/mysql/scripts/spring_security_custom_user_registration_demo.sql ]

then

  cp ./sql-scripts/refresh-database-with-100-products.sql ./.docker/mysql/scripts/

echo --------------------------------SQL script was copied.--------------------------------

fi


echo --------------------------------Project was build.--------------------------------


docker-compose up -d --build

echo --------------------------------"Waiting for the database to initialize (first time takes needs a few seconds more)"--------------------------------
sleep 10

# OPEN BROWSER WITH THE url
/usr/bin/open -a "/Applications/Google Chrome.app" 'http://dev.security.com/api'