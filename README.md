# Mobile Meal Ordering System for Cannon Dial Elm Club

## Background
- I embarked on this project in May 2024, with the aim to deliver an end to end mobile meal ordering system for Cannon Dial Elm Club at Princeton University.
- Cannon Dial Elm Club provides 3 meals per day to 200 daily members, and would traditionally field orders via ipads located inside the club itself.
- This system works great in most cases, but it lacked the convenience boasted by mobile ordering. In addition, athletes and other students with extra curricular commitments,
often found it difficult to place orders in time after rushing from practice or other commitments.
- With the benefits a mobile ordering system would bring to the club evident, I volunteered to make it a reality.

## Project Requirements
This system include 4 primary components:
  1) A mobile app for placing orders
  2) An interface for the club staff to maintain menus, meal times, and member permissions
  3) A cloud hosted server to handle order processing, authentication, and CRUD operations
  4) A locally run server to communicate with the ticket printer, and receive print jobs from the main server

System Requirements:
  1) Handle up to 300 orders per hour
  2) Full reliability (never lose an order)
  3) Intuitive mobile experience with clear communication of order statuses
  4) Intuitive admin interface, supporting easy maintenance and modification of menus, meal times, and members
  5) Compatibility with TSP100iiiLAN series thermal printer, with custom ticket format

## Technologies Used 
Mobile and Admin Interface:
- React/React Native
- Typescript
- Redux
- NativeBase/Chakra UI

Cloud Server:
- Flask
- MySQL
- Alembic
- Socketio

Local Printer Server:
- Flask
- Socketio
- ASP.NET (for printing microservice)

## Languages: 
- JS/TS ****
- Python ****
- C# *
- HTML **
- CSS *
- SQL **
- Powershell *

MISC:
- TSP144iii Ethernet based thermal printer
- Network configuring
- Command Line scripting


## Authors
Carson Irons  
LinkedIn: linkedin.com/in/carson-irons-9ab55a23b
