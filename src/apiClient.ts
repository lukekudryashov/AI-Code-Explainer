//Handles API Call to Claude AI API

import Anthropic from "@anthropic-ai/sdk";
//import dotenv
import * as dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  throw new Error("ANTHROPIC_API_KEY is not defined in environment variables");
}

const client = new Anthropic({apiKey: API_KEY});
const MODEL = 'claude-sonnet-4-6';
const MAX_TOKENS = 1024;

interface ResponseType { 
    explanation: string; 
    confidence_level: number; 
    confidence_reason: string
}

//async function to fetch data from Claude AI API
//takes string prompt, returns string response
export async function getResponse(readingLevel: string, prompt: string): Promise<ResponseType> {
    //send message
    const SYSTEM = `You are a helpful assistant for students learning to code. Given a code snippet you explain it in plain language at a level suitable for ${readingLevel}. Also include a confidence level in your explanation as a number between 0 and 1 and a reasoning for the confidence level. Return JSON matching the schema exactly.`;
    const response = await client.messages.create({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: SYSTEM,
        messages: [{content: prompt, 
            role: "user"}],
        output_config: {
            format: {
                type: "json_schema",
                schema: {
                    type: "object",
                    properties: {
                        explanation: {type: "string"},
                        confidence_level: {type: "number"},
                        confidence_reason: {type: "string"}
                    },
                required: ["explanation", "confidence_level", "confidence_reason"],
                additionalProperties: false
                }
            }
        }
        });
    // console.log(response);
    const block = response.content[0];
    if (block && block.type === "text") {
        try {
            const responseObject: ResponseType = JSON.parse(block.text);
            return responseObject;
        } catch {
            throw new Error("Failed to parse Claude response.");
        }
    } else {
        throw new Error("Claude was not able to generate a response.");
    }
}