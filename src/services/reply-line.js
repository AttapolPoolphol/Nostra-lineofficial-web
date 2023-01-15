import { request } from './rest-api'

class ReplyLineApi {
  ticket = async (uid, ticketIds) => {
    return await request('POST', '/ReplyTicketsCard', { uid, ticketIds })
  }
}

export default new ReplyLineApi()
