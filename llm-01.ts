import OpenAI from 'openai';

export const openai = new OpenAI();

const userMessage = process.argv[2];

if (!userMessage) {
    console.error('Please provide a message');
    process.exit(1);
}

(async () => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: userMessage }],
        temperature: 0.1
    });

    console.log(response.choices[0].message);
})();
