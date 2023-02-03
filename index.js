const express = require("express");
const path = require("path");

const api = require("./api");

const Bot = require("./bot");

const config = require("./config")

const Rinna = new Bot(config);

// 捕捉異常錯誤
process.on("uncaughtException", (err) => {
    console.error("未捕捉的異常錯誤", err);
});

process.on("unhandledRejection", (err, promise) => {
    console.error("未捕捉的失敗回傳", err);
});

(async (TOKEN, YOUTUBE_COOKIE) => {
	//console.clear();
    
	const app = express();
	app.use('/', express.static(__dirname + '/web'));
	app.get("/", async (req, res) => {
		res.sendFile(path.join(__dirname, "./web/index.html"));
	});
	app.get('/getvideos', async (req, res) => {
		let data = await api.getData();
		res.json(data);
	});
	app.listen("3030", () => {
        console.log(
            `連接至 rinna.karirino3o.repl.co:3030`
        );
    });
	
	
	Rinna.init({
		TOKEN: TOKEN,
		YOUTUBE_COOKIE: YOUTUBE_COOKIE
	});
	
})(process.env.token_karirin, process.env.YOUTUBE_COOKIE);


// O3O

/*
                                                                    
                                                  
              (((((((                             
           /((((((((###*                          
         (###((((###((((((                        
      *((((((#####(((((((,....                    
    /(((((((######(((((........%(                 
     (((((###(((((##,.........%####               
       .###(((((((...........%#######(            
          (((((,...........%%###########          
            ..............%%##############(       
           ..............%%#################      
             ..........%%%##################      
               .......%%%#################        
                  ...%%%###############           
                       (#############             
                          ########                
 */