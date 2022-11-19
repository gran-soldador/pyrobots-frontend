import { rest } from 'msw'
import {
  BASE_URL,
  API_ENDPOINT_WINNER,
  API_ENDPOINT_USER_DATA,
  API_ENDPOINT_LIST_ROBOTS,
  API_ENDPOINT_RECOVER_PASSWORD
} from '../components/ApiTypes'


export const handlers = [
    rest.get(BASE_URL + API_ENDPOINT_WINNER + localStorage.getItem('id_lobby'), (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([
                {
                  "user": "Kevin2",
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
    }),
    rest.get(BASE_URL + API_ENDPOINT_USER_DATA, (req, res, ctx) => {
      const isAuthenticated = sessionStorage.getItem('username')
      if (!isAuthenticated) {
        return res(
          ctx.status(403),
          ctx.json({
            errorMessage: 'Not authenticated',
          }),
        )
      }
      return res(ctx.status(200),
        ctx.json([
          {
            "username": "Kevin",
            "mail": "kevingston47@gmail.com",
            "avatar": "http://localhost:9000/avatars/KevinUserAvatar.jpg"
          }
        ])
      )
    })
]