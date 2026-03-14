# AI Code Explainer CLI

A command-line tool that uses Anthropic's Claude API to generate explanations of code snippets at three different reading levels: plain language (8th grade reading level), undergraduate computer science, and graduate computer science.

The program accepts a multi-line code snippet from the user, sends it to the Claude API, and returns:

- An explanation of the code at the specified reading level

- A confidence score (0–100%)

- A brief explanation of the confidence level

This tool is designed for students learning programming who want quick explanations tailored to their level of expertise.

## Features

- Interactive CLI
- Choices of multiple explanation levels
- Multi-line code input
- Structured JSON responses from the Claude API
- Confidence scoring and reasons behind confidence score

## Requirements

- Node.js
- An API key from Anthropic

## Installation

Install dependencies:
```bash
npm install
```

## Setup

Create a .env file:
```bash
ANTHROPIC_API_KEY=your_api_key_here
```
Do not use quotation marks around the API key.

You can obtain an API key from the Anthropic developer console: platform.claude.com.

## Run

```bash
tsc
npm start
```

## Usage

1. Choose a reading level (1, 2, or 3)
2. Paste the code snippet you want explained
3. Type END on a new line when finished and press ENTER

Example

```bash
Select a reading level:
1) Plain language
2) Undergraduate computer science
3) Graduate computer science

3

Paste code you would like explained, then type END on a new line when finished:

> console.log(response);
END

Processing...
Explanation: This is a JavaScript statement that outputs the value of a variable named 'response' to the browser's developer console (or Node.js console). 'console' is a built-in global object that provides access to the browser's debugging console, and 'log' is a method on that object used to print values. The variable 'response' could hold any JavaScript value — commonly used in contexts like HTTP responses from fetch/axios calls, callback results, or any computed data. At runtime, the console will display a string representation of the value, and for objects/arrays, most browser DevTools allow interactive inspection of the structure.
Confidence level: 99%
Confidence Reason: This is an extremely common and straightforward JavaScript statement with well-documented behavior. There is virtually no ambiguity in what console.log() does, making the confidence level very high.
```

## Project Structure

```bash
src/
  apiClient.ts   # Handles communication with the Claude API
  index.ts       # CLI interface and user input
```

## Technologies Used

- TypeScript
- Node.js
- Anthropic SDK
- dotenv
- readline

## License

MIT License

Copyright (c) 2026 Luke Kudryashov

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
