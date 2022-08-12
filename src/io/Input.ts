import * as readline from "readline";

export class Input {
    static prompt(prompt: string): Promise<string> {
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        return new Promise(resolve => {
            rl.question(prompt, answer => {
                rl.close();
                resolve(answer);
            });
        });
    }
}