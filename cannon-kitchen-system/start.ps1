##########################################
##Instructions to run (in root directory)
    ##Run | Set-ExecutionPolicy RemoteSigned
    ##Run | ./start.ps1
##########################################


##Navigate to admin-interface and start interface on port 1895
cd ./admin-interface
npm start -- --port 1895

##Navigate to server activate virtual environment 
cd ../server
myEnv/Scripts/Activate

##Run server 
python run.py

##Deactivate virtual environment
deactivate

##Navigate back to root directory 
cd ../
