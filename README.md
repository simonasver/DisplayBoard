# DisplayBoard

## Summary
Display board is written in .NET 6 C# (back-end) and Typescript React (front-end). JSON Web Tokens are being used for authentication and authorization, MySQL is being used for database.

### Unauthorized user can:

- Create a visit with wanted specialist. Upon creation start time is selected one minute after the last visit for the specialist or current time if the specialist is free. ![Visit creation](https://i.imgur.com/c8g8vSH.png "Visit creation")
- Check time left for visit by visit code. ![Visit check](https://i.imgur.com/RQuM5G4.png "Visit check")
- Check seven upcoming visits with correct password. ![Display board](https://i.imgur.com/CcIBvh4.png "Display board")

### Authorized user (specialist) can:

- Check all of their visits. ![My visits](https://i.imgur.com/45OvJ6r.png "My visits")
- Mark visit as started, as ended or as cancelled.

Back-end updates visits every 3 seconds - marks started visits as ended if they should have ended and front-end requests last 7 visits data for display board every 3 seconds in order to have the most recent data.

