This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm install`

Installs all of the necessary modules for the application.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The browser will NOT function as intended, as it is for visual purposes.
An Electron window will open after the browser view has loaded and that window will be functional.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run-script build`

Builds the applciation into an executable.<br />
Open '../HXR_NAO_APP-win32-x64/HXR_NAO_APP.exe' to run the executable for the application.

There are 4 small changes necessary for app to function and display properly in the executable:

1,2,3) In 'HXR_NAO_APP-win32-x64/resources/app/build/index.html', change all references (there are 3) of '/static/' to './static/'. Then save.

4) In 'HXR_NAO_APP-win32-x64/resources/app/utils/PythonNAO.js', change reference of './scripts/' to './resources/app/scripts/'. Then save and run the executable.