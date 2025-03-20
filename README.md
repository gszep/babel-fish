# BABEL 魚

A Japanese to English Translator. This project is a web application that utilizes the Google Speech-to-Text API and the Translation API to live translate audio streams from Japanese phone calls to English text.

## Features

-   Real-time audio capture from the user's device.
-   Speech recognition using Google Speech-to-Text API.
-   Translation of recognized Japanese text to English using Google Translation API.
-   User-friendly interface for seamless interaction.

## Installation

1. Clone the repository:
    ```
    git clone https://github.com/gszep/babel-fish.git
    ```
2. Navigate to the project directory:
    ```
    cd babel-fish
    ```
3. Install dependencies for both client and server:
    ```
    cd client
    npm install
    cd ../server
    npm install
    ```

## Usage

1. Set up your Google Cloud credentials and create a `.env` file in the root directory based on the `.env.example` file.
2. Start the server:
    ```
    cd server
    npm start
    ```
3. Start the client:
    ```
    cd client
    npm start
    ```
4. Open your browser and navigate to `http://localhost:3000` to use the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
