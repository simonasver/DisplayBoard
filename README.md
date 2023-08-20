# DisplayBoard

## Sumnmary
Display board is written in .NET 6 C# (back-end) and Typescript React (front-end). JSON Web Tokens are being used for authentication and authorization, MySQL is being used for database.

Live website: LINK

Unauthorized user can:

• Create a visit with wanted specialist - LINK
• Check time left for visit by visit code - LINK
• Check seven upcoming visits with correct password - LINK

Authorized user (specialist) can:

• Check all of their visits - LINK
• Mark visit as started, as ended or as cancelled

Back-end updates visits every 3 seconds - marks started visits as ended if they should have endend and front-end requests last 7 visits data for display board every 3 seconds in order to have the most recent data.

