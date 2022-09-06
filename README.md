<img src="./public/assets/icon_01d.png" width="96" />

# React Weather App

![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)

Based on [React-WeatherApp](https://github.com/gheorghedarle/React-WeatherApp) by @gheorghedarle

**Weather App** is a simple weather app developed in typescript using React and NoesisGUI. The app allows you to see the weather from your current location or another location around the globe using **WeatherKit REST API**.

## Setup

Create a file called **.env** in the root of the React-WeatherApp project. Add the following code in the file.

```
VITE_APP_WEATHERKIT_BASEURL = "https://weatherkit.apple.com"
VITE_APP_WEATHERKIT_TOKEN = "YOUR_WEATHERKIT_TOKEN"
```

To use real data, change the flag **useMockData** to false from **App.tsx**.
