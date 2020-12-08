import Axios from 'axios'
import { Router, Request, Response } from 'express'
import {
  createControllerSpan,
  finishSpanWithResult,
} from './createTracerController'
const routes = Router()

routes.get(
  '/:cep?',
  async (req: Request, res: Response): Promise<Response> => {
    const { cep } = req.params

    const traceSpan = createControllerSpan(
      'getCep',
      'Get Address from another service',
      req.headers
    )

    if (cep) {
      const response = await Axios.get(`http://localhost:3331/${cep}`)
      finishSpanWithResult(
        traceSpan,
        200,
        false,
        req.headers,
        req.body,
        response
      )
      return res.status(200).send(response.data)
    } else {
      const response = {
        txt: 'Teste',
      }
      finishSpanWithResult(
        traceSpan,
        400,
        true,
        req.headers,
        req.body,
        response
      )
      return res.status(400).send(response)
    }
  }
)

export default routes
