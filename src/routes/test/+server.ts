import type { RequestHandler } from '../$types';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi} from 'openai-edge';
import { OPENAI_KEY } from '$env/static/private'

const config = new Configuration({
    apiKey: OPENAI_KEY
})

const openai = new OpenAIApi(config)

export const POST: RequestHandler = async ({ request }) => {
    const { messages } = await request.json();

    const response = await openai.createChatCompletion({
        model:  'gpt-3.5-turbo', 
        stream: true, 
        messages: [
            {
                role: 'system',
                content: 'Your Name is BillionairesHelper You are a helpful AI playing knots and crosses except you must make a 5 line row and knots are red boxes and crosses are blue boxes and the grid is 10 by 10 start with a x direction being alphabet and y direction numbered from the bottom left. The Game you are in is called Box and Dots  '
            },
            ...messages
        ]
    })
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

};