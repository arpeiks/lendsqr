import { Request, Response } from 'express'
import User from '../services/user.service'

interface Props {
  register: any
}

const controller: Props = {} as any

controller.register = async (req: Request, res: Response) => {
  try {
    const user = await User.register(req.body)
    res.json(user)
  } catch (err) {
    console.log(err)
  }
}

export default controller
