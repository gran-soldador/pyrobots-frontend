// src/mocks/handlers.js
import { rest } from 'msw'

export const handlers = [   
  // Handles a GET /simulacion request
  rest.get('http://localhost:8000/simulacion', (req, res, ctx) => {
    // If authenticated, return a mocked user details
    // console.log("Res: ", res);
    return res(
      ctx.status(200),
      ctx.json({
        "maxrounds" : 10000,
        "players" : [
            {id: 1, name: 'RandomRobot'},
            {id: 3, name: 'SquareRobot'},
            {id: 4, name: 'DVDRobot'},
            {id: 5, name: 'SpiralRobot'}
        ],
        "rounds" : [
            {
                "explosions" : [
                    {x: 194.4433165128891, y: 393.1725291957923},
                    {x: 132.6478148779924, y: 422.44419563347327}
                ],
                "missiles" : [],
                "robots": [
                    {x: 763.022449290017, y: 296.7364679408065, damage: 100},
                    {x: 763.022449290017, y: 296.7364679408065, damage: 100},
                    {x: 250.68307456314065, y: 442.79197714162456, damage: 91},
                    {x: 187.9900956886203, y: 371.79853254549306, damage: 100}
                ],
                "rounds_played": 5056,
            }
        ],
        "winners" : [
            {id: 4, name: 'DVDRobot'}
        ]
      }),
    )
  }),
]