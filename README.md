This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The browser will NOT function as intended, as it is for visual purposes.
An electron window will open after the browser view has loaded and that window can be used.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run-script build`

Builds the applciation into an executable.<br />
Open '../HXR_NAO_APP-win32-x64/HXR_NAO_APP.exe' to run the executable for the application.

In 'HXR_NAO_APP-win32-x64/resources/app/build/index.html', 3 small changes are necessary for
app to display properly in the executable:
Change all references of 'static/' to './static/'

