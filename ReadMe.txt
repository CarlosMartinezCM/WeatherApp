Author: Carlos M

This app displays the Weather for a given the current location. When deployed you can search by city name
to retrieve the weather.

The app displays space weather information as well as some cool Sun images and cool space videos.

This React application is deployed on Vercel and displays as a static site, with limited functionality. 

You can check out the site using the link below. 

carlosweather.com


***************************************************
Adding Contact me code. need to activate google app-specific password.
then do the following. 

Install
npm install nodemailer



3. Add Environment Variables in Vercel
Go to Project Settings > Environment Variables and add:

EMAIL_USER → your email (e.g., Gmail)

EMAIL_PASS → app password (e.g., Gmail app-specific password)

EMAIL_TO → where to send the message

⚠️ For Gmail, you'll likely need to enable 2FA and create an App Password.

✅ 4. Deploy and Test
Once your site is redeployed via Vercel:

Visit your Contact form

Fill it out and submit

You should receive an email 🎉

/my-react-project
│
├── /api
│   └── send-email.js     ← Your serverless function
│
├── /src
│   └── /components
│       └── ContactForm.js
│
├── package.json          ← Includes nodemailer as a dependency
└── ...
