
This application includes an client side made on react.js and redux-toolkit

How to set developer environment:

  -create file .env in main directory of this app.
 
  -open file .env_example.txt and copy all variables in .env file.
 
  -edit the value of variables:
 
 	- REACT_APP_DEV_API_URL = http://localhost:5000 (where 5000 is port of backend app)
 	- REACT_APP_DEV_CLIENT_URL = 'http://localhost:3000' (React default localhost) 
 	
 - save .env file and enter next comands in terminal:
 	
		- npm install
		- npm run dev
	
 
 How to deploy app on Heroku:
 
 -edit the value of variables:
 
	- REACT_APP_PRO_API_URL = url of your backend app
 	- REACT_APP_DEV_CLIENT_URL = url of your heroku domen (must create on www.heroku.com)
	
 -enter comands in terminal:
 
	- heroku login
	
	- heroku git:remote -a *your own domen on heroku*
	
	- git add .
	
	- git commit -m "name of your commit"
	
	- git push heroku master
	
	
