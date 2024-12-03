const readline = require('node:readline');

const foo = async ()=> {
    const rlInstance = readline.createInterface({
        input:process.stdin,
        output: process.stdout
    })

    rlInstance.question('What is your name?', (name) => {
        console.log(`Hello ${name}`);
        rlInstance.close();
    })
}

void foo();