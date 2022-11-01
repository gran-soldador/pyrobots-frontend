import { rest } from 'msw'


export const handlers = [
    rest.get('http://localhost:8000/match-result/' + localStorage.getItem('id_lobby'), (req, res, ctx) => {
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
    rest.get('http://localhost:8000/lista-robots', (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([
                {
                  "id": "1",
                  "nombre": "Viserys",
                }
            ])
        )
    }),
    rest.get('http://localhost:8000/ws/' + localStorage.getItem('id_lobby'), (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([{"event": "join", "creador": "lautaro", "contraseña": false, 
                "robot": [
                    {"id": 1, "nombre": "Kempes", "usuario": "lautaro"}, 
                    {"id": 3, "nombre": "Klusener", "usuario": "gonzalo"}
                ]}]
            )
        )
    }),

    rest.get('http://127.0.0.1:8000/unir-partida', (req, res, ctx) => {
        return res(ctx.status(200),
            ctx.json([{detail: "disponible"}]
            )
        )
    })
]