import { rest } from 'msw'
import {
  BASE_URL,
  API_ENDPOINT_WINNER,
  API_ENDPOINT_LIST_ROBOTS
} from '../components/ApiTypes'


export const handlers = [
    rest.get(BASE_URL + API_ENDPOINT_WINNER + localStorage.getItem('id_lobby'), (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([
                {
                  "usuario": "Kevin2",
                  "robot": "Viserys",
                  "id": 2
                }
            ])
        )
    }),
    rest.get(BASE_URL + API_ENDPOINT_LIST_ROBOTS, (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([
                {
                  "id": "1",
                  "nombre": "Viserys",
                },
                {
                  "id": 19,
                  "nombre": "SquareRobot"
                },
                {
                  "id": 20,
                  "nombre": "RandomRobot"
                },
                {
                  "id": 16,
                  "nombre": "SpiralRobot"
                }
            ])
        )
    }),
    rest.get('http://localhost:8000/ws/' + localStorage.getItem('id_lobby'), (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([{nickName: "Jugador1", Robot: '1'},{nickName: "Jugador2", Robot: '2'}]
            )
        )
    })
]