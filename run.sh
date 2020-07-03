#! /bin/sh

while :
do
        echo "Starting process..."
	cd /home/bot/bin/src
        node index.js
        if [ $? -eq 0 ]
        then
                echo "Stopping process..." # exit shell script if exit code is 0
                break
        fi
        sleep 10 # wait 10 seconds before restarting
done