const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
  session: 'sessionName', //Pass the name of the client you want to start the bot
  catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
    console.log('Number of attempts to read the qrcode: ', attempts);
    console.log('Terminal qrcode: ', asciiQR);
    console.log('base64 image string qrcode: ', base64Qrimg);
    console.log('urlCode (data-ref): ', urlCode);
  },
  statusFind: (statusSession, session) => {
    console.log('Status Session: ', statusSession); //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken
    //Create session wss return "serverClose" case server for close
    console.log('Session name: ', session);
  },
  headless: false, // Headless chrome
  devtools: false, // Open devtools by default
  useChrome: true, // If false will use Chromium instance
  debug: false, // Opens a debug session
  logQR: true, // Logs QR automatically in terminal
  browserWS: '', // If u want to use browserWSEndpoint
  browserArgs: [''], // Parameters to be added into the chrome browser instance
  puppeteerOptions: {}, // Will be passed to puppeteer.launch
  disableWelcome: false, // Option to disable the welcoming message which appears in the beginning
  updatesLog: true, // Logs info updates automatically in terminal
  autoClose: 60000, // Automatically closes the wppconnect only when scanning the QR code (default 60 seconds, if you want to turn it off, assign 0 or false)
  tokenStore: 'file', // Define how work with tokens, that can be a custom interface
  folderNameToken: './tokens', 
  sessionToken: {
    WABrowserId: '"UnXjH....."',
    WASecretBundle: '{"key":"+i/nRgWJ....","encKey":"kGdMR5t....","macKey":"+i/nRgW...."}',
    WAToken1: '"0i8...."',
    WAToken2: '"1@lPpzwC...."',
  }
})
.then((client) => start(client))
.catch((error) => console.log(error));


function start(client) {
  client.onMessage(async message=> {
   console.log(message)
   const userId = message.sender.id;
   const usernumber = userId.split("@")[0]
   const user = {
    id: message.from,
    name: message.sender.pushname,
    phone: usernumber,
    location: "Zimpeto",
   }
   console.log(user)
    client
      .sendText(message.from, await askBot(message.body, user))

  });
}


async function askBot(prompt, user){
  try{
  
    

      const response = await fetch('https://edmbotapi.onrender.com/ai/edmbot-test/stream/ask', {
      method: "post",
      credentials: 'include',
      headers: {
        'Authorization': 'dev-aidbuikacalwgdconnamwqirycnvacpaevsbmsoaadaczawacawbbacf-team',
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ 
        prompt,
        user,
        stream: false
      })
    });

    const text = await response.text()
   console.log(text)

   return text
    
  } catch (error) {
    console.error(error);
        bot.sendMessage(msg.from.id, `Invalid url, Try sending only the url you pretend to short`)
  }
}


// if (message.body === 'Hello') {
//   console.log(message)
//   client
//     .sendText(message.from, 'Hello, how I may help you?')
//     .then((result) => {
//       console.log('Result: ', result);
//     })
//     .catch((erro) => {
//       console.error('Error when sending: ', erro);
//     });
// }
// if (message.body === 'Preciso falar com humano') {
//   console.log(message)
//   const userId = message.sender.id;
//   const usernumber = userId.split("@")[0]
//   client
//     .sendText('258821001421@c.us', `The client ${message.sender.verifiedName}, needs help. wa.me/+${usernumber}`)
//     .then((result) => {
//       console.log('Result: ', result); 
//     })
//     .catch((erro) => {
//       console.error('Error when sending: ', erro); 
//     });
// }