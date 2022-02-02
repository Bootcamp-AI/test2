if (message.body === 'Cuñas' && message.isGroupMsg === false) {
      client
        //.sendText(message.from, "Hola")
        //.sendImage(message.from, 'https://static.wixstatic.com/media/8ae40c_fb659ef1311a4d9d9bb351f68fb873c2~mv2_d_2019_2019_s_2.jpg/v1/fill/w_2500,h_2500,al_c/8ae40c_fb659ef1311a4d9d9bb351f68fb873c2~mv2_d_2019_2019_s_2.jpg', "Campaña", "Caption")
        .sendVoice(message.from, './Public/PODCASTEDUCACION.mp3')
        //.sendVideoAsGif(message.from, './Public/VIDEOINTERNEWS.mp4','video.gif', 'Gif image file')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    } else if(message.body === "Infografías" && message.isGroupMsg === false){
    	client
    		.sendFile(message.from, './Public/Infogra.pdf', 'Infografía', 'Revisa esta Infografía')
    		.then((result) => {
	          console.log('Result: ', result); //return object success
	        })
	        .catch((erro) => {
	          console.error('Error when sending: ', erro); //return object error
	        });
    } else if(message.body === "Videos"){
    	client
    		.sendVideoAsGif(message.from, './Public/VIDEOINTERNEWS.mp4','VIDEOINTERNEWS.gif', 'Revisa esta infografía de Corape')
    		.then((result) => {
	          console.log('Result: ', result); //return object success
	        })
	        .catch((erro) => {
	          console.error('Error when sending: ', erro); //return object error
	        });
    }