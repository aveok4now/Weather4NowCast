# Weather4Nowcast ⛅

[Live Demo](https://weather4nowcast-cdg.vercel.app/)

## Project Description

Weather4Nowcast is a meteorological web application that provides weather forecasts for various cities. Users can search for cities and view their weather forecasts either through a search function or a scrolling marquee that displays forecasts for multiple cities. The application includes settings where users can enable or disable specific weather settings and supports both light and dark themes. It is responsive and works on mobile devices, and cities are saved locally for convenience.

## Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Frontend**: [React](https://react.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)

## Features

1. **Current Location Weather**: Users can see the weather and name of their current location based on their coordinates.
2. **Add City**: Users can add a city to view its weather forecast.
3. **Switch Cities**: Users can switch between saved cities to view their weather.
4. **Remove City**: Users can remove a city from their saved list.
5. **Settings Page**: Users can customize the display options for weather data, such as sunset time, humidity, and feels-like temperature.

### Additional Features

- **Search Saved Cities**: Users can search through their saved cities.
- **Persistent Data**: The list of saved cities and settings persist after a page reload.

## Installation and Setup

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Development

To run the project in development mode:

1. Clone the repository:
    ```bash
    git clone https://github.com/aveok4now/weather4nowcast.git
    ```
2. Navigate to the project directory:
    ```bash
    cd weather4nowcast
    ```
3. Install dependencies:
    ```bash
    npm install
    ```
4. Start the development server:
    ```bash
    npm run dev
    ```
5. Open your browser and go to `http://localhost:3000`.

### Build

To build the project for production:

1. Run the build command:
    ```bash
    npm run build
    ```
2. The built files will be in the `dist` directory. You can deploy these files to any static hosting service.

## Deployment

The application is deployed using [Vercel](https://vercel.com/). To deploy the application.

## API

Weather data is fetched from [OpenWeatherMap](https://openweathermap.org/api). You will need to sign up for an API key and update the project configuration with your key.

## Contributing

Feel free to fork the project and submit pull requests. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.

---

For more information on how to use Tailwind CSS with React and Astro, please refer to their respective documentation:

- [Tailwind CSS](https://tailwindcss.com/docs)
- [React](https://reactjs.org/docs/getting-started.html)
- [Astro](https://docs.astro.build/)
