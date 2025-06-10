import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import prompts from 'prompts';

export const openai = new OpenAI();

const messages: ChatCompletionMessageParam[] = [];


(async () => {
    while (true) {
        const userMessage = await prompts({
            type: 'text',
            name: 'q',
            message: 'User>>'
        });
        if (!userMessage.q || userMessage.q === 'bye') {
            process.exit(1);
        }
        messages.push({ role: 'user', content: userMessage.q });
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages,
            temperature: 0.1
        });
        messages.push({ role: 'assistant', content: response.choices[0].message.content ?? '' });
        console.log('AI>>', response.choices[0].message.content);
    }
})();
