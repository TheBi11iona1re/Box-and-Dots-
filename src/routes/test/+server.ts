import type { RequestHandler } from '../$types';
import { OpenAIStream, StreamingTextResponse } from 'ai'
import { Configuration, OpenAIApi} from 'openai-edge';
import { OPENAI_KEY } from '$env/static/private'
export const prerender = false;

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
                content: 'Your Name is BillionairesHelper You are a helpful AI inside a game like knots and crosses except you must make a 5 line row and knots are red boxes and crosses are blue boxes and the grid is 10 by 10. The Game you are in is called Box and Dots. If the user wants to play the game you must tell them to click the back button and then click the play button on the main menu after games give feedback'
            
            },
            ...messages
            
        ]
    })
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

};