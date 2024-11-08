## This program accepts a text file in the format of 
## lastName, firstName email.edu
## Upon login, the program will parse a file of this format and 
## add each member to the system 

import requests
import sys

session = requests.Session()

username = input("Enter admin username: ")
password = input("Enter admin password: ")

loginEndpoint = "https://cannon-server.onrender.com/adminAuth/login"
loginPayload = {"username": username, "password": password}

try: 
    response = session.post(loginEndpoint, json=loginPayload)
    if (response.status_code != 200):
        print(f"Failed to login (status={response.status_code})")
        sys.exit()
except Exception as e: 
    print(f"Unexpected Error: {e}")
    sys.exit()

print("Successfully Logged In!")
memberLocation = input("Where should we look for members? (Please enter file location): ")

print("Thank you! Adding members...")

newMemberCount = 0

with open(memberLocation, 'r') as file: 
    for line in file: 
        ln, other = line.split(',')
        fn, email = other.split(' ')[-2:]

        lastName = ln.strip()
        firstName = fn.strip()
        email = email.strip()
        
        if(email[-4:] != ".edu"):
            print(f"Unexpected email found: {email}")

        endpoint = "https://cannon-server.onrender.com/admin/addMember"
        payload = {"email": email, "first_name": firstName, "last_name": lastName}
        try: 
            response = session.post(endpoint, json=payload)
            if (response.status_code == 200):
                #print(f"Successfully added {firstName} {lastName}")
                newMemberCount += 1
            else: 
                print(f"Failed to add {firstName} {lastName} (status={response.status_code})")
        except Exception as e: 
            print("Unexpected error: {e}")
        
print(f"Successfully added {newMemberCount} new members!")

        
            
