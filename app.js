const venom = require('venom-bot');
const dialogflow = require('./dialogflow');
const uuid = require("uuid");

const sessionIds = new Map();

venom
  .create(
    )
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage(async (message) => {
  	console.log(JSON.stringify(message,null," "));
    setSessionAndUser(message.from);
    let session = sessionIds.get(message.from);
  	let payload = await dialogflow.sendToDialogFlow(message.body, session);

   	let responses = payload.fulfillmentMessages;

   	for (const response of responses){
       await sendMessageToWhatsapp(client, message, response);

   		
   	}


   // console.log('Mensajes Dialogflow: '+message);


   	if (message.body === 'Cuñas' && message.isGroupMsg === false) {
      client
        //.sendText(message.from, "Hola")
        //.sendImage(message.from, 'https://static.wixstatic.com/media/8ae40c_fb659ef1311a4d9d9bb351f68fb873c2~mv2_d_2019_2019_s_2.jpg/v1/fill/w_2500,h_2500,al_c/8ae40c_fb659ef1311a4d9d9bb351f68fb873c2~mv2_d_2019_2019_s_2.jpg', "Campaña", "Caption")
        .sendVoice(message.from, 'http://www.bootcampai.org/wp-content/uploads/2022/02/cunas.mp3')
        //.sendVideoAsGif(message.from, './Public/VIDEOINTERNEWS.mp4','video.gif', 'Gif image file')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else if(message.body === "Infografías" && message.isGroupMsg === false){
    	client
    		.sendFile(message.from, 'http://www.bootcampai.org/wp-content/uploads/2022/02/proy1.pdf', 'Infografía', 'Revisa esta Infografía')        
    		.then((result) => {
	          console.log('Result: ', result); //return object success
	        })
	        .catch((erro) => {
	          console.error('Error when sending: ', erro); //return object error
	        });
        

    } else if(message.body === "Videos"){
    	client
    		.sendVideoAsGif(message.from, 'http://www.bootcampai.org/wp-content/uploads/2022/02/video1.mp4','corape.gif', 'Revisa este video de Corape')
    		.then((result) => {
	          console.log('Result: ', result); //return object success
	        })
	        .catch((erro) => {
	          console.error('Error when sending: ', erro); //return object error
	        });
    } else if(message.body === "Proyectos"){
    	client
        .sendFile(message.from, 'http://www.bootcampai.org/wp-content/uploads/2022/02/proy1.pdf', 'Proyectos', 'Revisa nuestros proyectos')
        .then((result) => {
	          console.log('Result: ', result); //return object success
	        })
	        .catch((erro) => {
	          console.error('Error when sending: ', erro); //return object error
	        });
    }
    
  });
}


function sendMessageToWhatsapp(client, message, response) {
  return new Promise((resolve, reject) => {
    client
      .sendText(message.from, response.text.text[0])
      .then((result) => {
        console.log("Result: ", result); //return object success
        resolve(result);
      })
      .catch((erro) => {
        console.error("Error when sending: ", erro);
        reject(erro);
      });
  });
}


async function setSessionAndUser(senderId){
  try {
    if(!sessionIds.has(senderId)){
      sessionIds.set(senderId, uuid.v1());
    }
  }catch (error){
    throw error;
  }
}