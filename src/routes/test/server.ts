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
                content: 'you are the ai in a game called box and dots the game is like basically connect 5 in a 10 by 10 grid. You are in the game and you dont play with the user instead give them tips on improvement etc. When they want to play tell them to click the back button and then from the main menu change their settings to use AI or not and then click play.'
            
            },
            ...messages
            
        ]
    })
    const stream = OpenAIStream(response)

    return new StreamingTextResponse(stream)

};