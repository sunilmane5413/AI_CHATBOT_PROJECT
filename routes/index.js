const express = require('express')
const router = express.Router()
const telegram = require('node-telegram-bot-api')   // npm package 
const{Configuration, OpenAIApi} = require('openai') // npm package
const token = '6233725312:AAF_wHUOSTmLx4ly0UeSt0c0h_Nb_NSxEr4' // this token is generated from telegram this if for my username 
const openAItoken = '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' // this is generated from openai api keys

const config = new Configuration({    // by using configuration property of oepenai we configuerd the openai token 
  apiKey:openAItoken 
})

const openai = new OpenAIApi(config);    // give the configuration to the openAIapi

// creates a Telegram bot and uses the OpenAI API to generate text in response to user messages

const bot = new telegram(token,{polling:true})    // this line create new instance of telegram bot by uing token 
bot.on('message',async (msg)=>{        // event listener for incoming messages. async function is called when msg is recieved
  const chatID = msg.chat.id            //this is chat id for incoming msg

  const reply = await openai.createCompletion({  // it user creatCompletions method which generte the response and await is used for
    // to wait  the api response before procedding
    max_tokens:100,   // max words
    model:'ada',// ada is a openai model is used for generating the response "GPT" ,"CODEX",
    prompt:msg.text,
    temperature:0.5, // temp is used for to control the randomness of text if high temp =more creative but less predictive 

  })
  bot.sendMessage(chatID, reply.data.choices[0].text)  //generated response back to the user, using the Telegram bot API's sendMessage method.
})

module.exports = router;
