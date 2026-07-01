
import OpenAI from "openai"; 
import type { Message} from "../types";

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function askLLM (messages: Message[]) {
    const result = await client.responses.create({
        model: "gpt-5.4-nano",
        input: messages
    });

    return result.output_text;
}