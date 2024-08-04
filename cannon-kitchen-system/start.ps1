##########################################
##Instructions to run (in root directory)
    ##Run | Set-ExecutionPolicy RemoteSigned
    ##Run | ./start.ps1
##########################################


##Navigate to admin-interface and start interface on port 1895
Start-Process powershell -ArgumentList "cd ./admin-interface; npm start"
Start-Sleep -Seconds 5

##Give feedback
Write-Host "Successfully started Cannon Kitchen System!"
Write-Host "To access the CKS Admin Interface, please visit http://localhost:3000"
Write-Host "You are currently viewing the CKS server logs..."

cd ./server
myEnv/Scripts/Activate 
python run.py