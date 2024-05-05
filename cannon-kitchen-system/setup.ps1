##########################################
##Instructions to run (in root directory)
    ##Run | Set-ExecutionPolicy RemoteSigned
    ##Run | ./setup.ps1 
##########################################

# Navigate to the client directory and install npm dependencies
cd .\client
npm install

# Navigate to the server directory and activate the virtual environment
cd ..\server
.\myEnv\Scripts\Activate

# Install Python dependencies
pip install -r requirements.txt

# Run database migrations
flask db upgrade

#Deactivate
deactivate

#Navigate back to root directory 
cd ../