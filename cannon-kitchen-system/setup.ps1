##########################################
##Instructions to run (in root directory)
    ##Run | Set-ExecutionPolicy RemoteSigned
    ##Run | ./setup.ps1 
##########################################

# Navigate to the client directory and install npm dependencies
cd .\admin-interface
npm install

# Navigate to the server directory and activate the virtual environment
cd ..\server
python -m venv myEnv
.\myEnv\Scripts\Activate

# Install Python dependencies
pip3 install -r requirements.txt

# Run database migrations
#flask db upgrade

#Deactivate
deactivate

#Navigate back to root directory 
cd ../
