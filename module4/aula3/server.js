const http = require('http');

const generateRandomContent = () => {
    const minSize = 100;
    const maxSize = 2000;
    const size = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize;
    const possibleChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let randomContent = '';
    for (let i = 0; i < size; i++) {
        randomContent += possibleChars.charAt(Math.floor(Math.random() * possibleChars.length));
    }
    return randomContent;
};

const server = http.createServer((req, res) => {
    // Simular erro aleatório a cada 100 requisições, 3% de chance de erro
    const randomValue = Math.floor(Math.random() * 100);

    if (req.url === "/") {
        if (randomValue < 3) {  // 3% de chance de retornar erro 500
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Internal Server Error");
            console.log("request failed with 500, random value: " + randomValue);
        } else {
            res.writeHead(200, { "Content-Type": "text/html" });
            const content = `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Random Content Size Page</title>
                </head>
                <body>
                    <h1>Random Content Size Page</h1>
                    <p>${generateRandomContent()}</p>
                </body>
                </html>
            `;
            console.log("request accepted, body response length: " + content.length);
            res.end(content);
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Not Found");
    }
});

const PORT = 80;
server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
