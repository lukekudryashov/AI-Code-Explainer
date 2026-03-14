// Runs the program and prints the result

//import getResponse function from apiClient.js
import { getResponse } from './apiClient.js';
//import readline
import * as readline from 'readline/promises';

//take user input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//gets reading level user input
async function askForReadingLevel(): Promise<string> {
    while (true) {
        const readingLevel = await rl.question(
            "Select a reading level:\n1) Plain language\n2) Undergraduate computer science\n3) Graduate computer science\n\n"
        );
        if (readingLevel === "1") return "plain language (8th grade reading level)";
        if (readingLevel === "2") return "undergraduate computer science";
        if (readingLevel === "3") return "graduate computer science";
        console.log("Please enter 1, 2, or 3.\n");
    }
}

//takes reading level, gets code snippet, calls Claude AI API and prints response
async function askForCode(readingLevel: string) {
    console.log("\nPaste code you would like explained, then type END on a new line when finished:\n");
    let prompt = "";
    for await (const line of rl) {
        if (line.trim() === "END") break;
        prompt += line + "\n";
    }
    try {
        console.log("\nProcessing...\n");
        const response = await getResponse(readingLevel, prompt);
        const confidencePercent = response.confidence_level*100;
        console.log(`\nExplanation: ${response.explanation}\n\nConfidence level: ${confidencePercent}%\n\nConfidence Reason: ${response.confidence_reason}`);
    } catch(error) {
        console.error(error);
    } finally {
        rl.close();
    }
}

const readingLevel = await askForReadingLevel();
await askForCode(readingLevel);