# HB Frontend Task

HB Frontend Task is a ReactJS application to implement the task found here - https://github.com/hackerbay/interview-frontend-task.<br>It's basically a game where the player is required to collect all coins on a board of their choice's dimensions as fast as possible to free the princess who is locked up. For every coin collected, the chances of saving the princess are higher. Play the game [here](https://natenjuguna.github.io/hb-frontend-app)

## Installation

Run the following commands to run the server:

```bash
git clone https://github.com/NateNjuguna/hb-frontend-task.git && cd hb-frontend-task
npm install
npm start
```

This will install the necessary dependencies, set temporary environment variables required by the app and start a server at <http://localhost:3000>.

### Docker
A public docker image is available at [https://hub.docker.com/r/natenjuguna/hb-frontend-task/](https://hub.docker.com/r/natenjuguna/hb-frontend-task/)

## Testing

Testing can be done by using the following command in your installation directory:

```bash
npm test
```

This will run test suites and generate HTML code coverage reports in the `coverage` directory of your installation. Test logs would be found in the `hb-backend-task_test.log` file in the installation folder.

## Usage

- Navigate to http://localhost:3000 on your browser
- When prompted, type in the board height and width in numbers between 2 and 20
- The game will start with the player roughly in the middle and coins spread out randomly
- Use your keyboard's arrow keys to move the player in the board; collecting coins as fast as possible
- Click on the "Back" button to reverse a move
- Click on the "Reset Game" button to reset the game
- Click on the "New Game" button to restart the game with the coins re-shuffled
- When the game is completed, it automatically starts a new one

## Troubleshooting

- Ensure you use a version of NodeJS >=8.11.4

## LICENSE

[MIT](LICENSE)
