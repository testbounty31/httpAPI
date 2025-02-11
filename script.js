
document.getElementById("sendRequest").addEventListener("click", startSimulation);

function startSimulation() {
    const method = document.getElementById("method").value;
    let simulationBox = document.getElementById("simulationBox");
    let securityBox = document.getElementById("security");
    let networkBox = document.getElementById("networkFlow");
    let requestResponseBox = document.getElementById("requestResponse");

    simulationBox.innerHTML = "1️⃣ Client: Resolving DNS for httpbin.org...";
    setTimeout(() => {
        simulationBox.innerHTML += "\n🌍 DNS Resolution Complete: IP Address Found!";
        networkBox.innerHTML = "[Network] Establishing TCP Connection...";
        
        setTimeout(() => {
            networkBox.innerHTML += "\n📡 Step 1: SYN Sent (Client -> Server)";
        }, 3000);
        setTimeout(() => {
            networkBox.innerHTML += "\n🔁 Step 2: SYN-ACK Received (Server -> Client)";
        }, 6000);
        setTimeout(() => {
            networkBox.innerHTML += "\n✅ Step 3: ACK Sent - Connection Established!";
        }, 9000);
    }, 3000);
    
    setTimeout(() => {
        networkBox.innerHTML += "\n🔒 TLS Handshake: Secure HTTPS Connection Established";
        simulationBox.innerHTML += "\n2️⃣ Server: Processing Request...";
        
        setTimeout(() => {
            securityBox.innerHTML = "[Security] Security Headers Applied:\n - Secure Cookies\n - XSS Protection\n - Content Security Policy\n - Rate Limiting Applied";
        }, 3000);

        sendRealRequest(method);
    }, 12000);
}

function sendRealRequest(method) {
    let requestResponseBox = document.getElementById("requestResponse");

    fetch(`https://httpbin.org/${method.toLowerCase()}`, {
        method: method,
    })
    .then(response => response.json())
    .then(data => {
        requestResponseBox.innerHTML = `🔹 HTTP Request:\n${method} / HTTP/1.1\nHost: httpbin.org\nUser-Agent: SecureBrowser/1.0\n`;

        requestResponseBox.innerHTML += `\n🔹 HTTP Response:\nStatus: ${data.status || 200}\nHeaders:\n`;
        
        if (data.headers) {
            for (const [key, value] of Object.entries(data.headers)) {
                requestResponseBox.innerHTML += `${key}: ${value}\n`;
            }
        }
        
        requestResponseBox.innerHTML += `\nResponse Body:\n${JSON.stringify(data, null, 2)}`;
    })
    .catch(error => {
        requestResponseBox.innerHTML = `❌ Error Fetching Data: ${error}`;
    });
}
