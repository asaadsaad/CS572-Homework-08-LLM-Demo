import OpenAI from 'openai';
import { ChatCompletionMessageParam } from 'openai/resources';
import prompts from 'prompts';

export const openai = new OpenAI();

const messages: ChatCompletionMessageParam[] = [];


function get_student_grade() { }

const gradesTool = {
    type: "function" as const,
    function: {
        name: "get_student_grade",
        description: "Use this function to get the student grade",
        parameters: {
            type: "object",
            properties: {
                student_id: {
                    type: "string",
                    description: "Student ID"
                }
            },
            required: ["student_id"]
        }
    }
};


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
            temperature: 0.1,
            tool_choice: 'auto',
            tools: [gradesTool],
        });
        messages.push({ role: 'assistant', content: response.choices[0].message.content ?? '' });
        console.log('AI>>', response.choices[0].finish_reason, response.choices[0].message.content);

        if (response.choices[0].finish_reason === 'tool_calls') {
            console.log('Tool call>>', response.choices[0].message.tool_calls);
        }
    }
})();
