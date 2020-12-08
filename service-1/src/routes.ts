import Axios from 'axios'
import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/:cep', async (req: Request, res: Response) => {
  const { cep } = req.params
  const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`)
  res.status(200).send(response.data)
})

export default routes
