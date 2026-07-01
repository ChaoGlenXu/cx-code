import readline from "node:readline";

import { askLLM } from "../llm/openai";
import type { Message} from "../types.ts";
import {systemPrompt} from "../prompts/system";

export async function startCli() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const messages: Message[] = [{
        role: "system",
        content: systemPrompt
    }];
 
    rl.setPrompt("> ");
    rl.prompt();        

    rl.on("close", ()=>{
        console.log("Goodbye!");
        process.exit(0);
    } )
    
    

    rl.on("line", async (input) =>{
        input = input.trim();

        if (input === "exit") {
            rl.close();
            return;
        }

        rl.pause()

        messages.push({
            role: "user",
            content: input
        });

        try{
            const result = await askLLM(messages);
            
            messages.push({
                role: "assistant",
                content: result
            });
            
            console.log( result );

        }catch (err) {
            console.log("Error message: ", err );
        } finally {
            rl.prompt(); 
            rl.resume()
        }
            
        
    } );
}