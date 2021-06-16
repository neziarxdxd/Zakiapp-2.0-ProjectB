const { router, route,text } = require('bottender/router');
const fetch = require('node-fetch');

async function doSolveThis(context){

  //get the text
  var parseString = context.event.text

  // this will split the string by space 
  var splittedString = parseString.split(" ")

  // removes the forward slash and get the function 
  var command = splittedString[0].substring(1,)

  // this get the whole equation 
  var eq = splittedString.slice(1, splittedString.length )  
  var equation= eq.join(" ");

  // send the Command and Equation 
  await context.sendText("command: "+command)
  await context.sendText("equation: "+equation)
  
    
  // transform the equation to URI
  var encodedUrl = encodeURIComponent(equation)
  
  try {
    
    var response = await fetch(`https://newton.now.sh/api/v2/${command}/${encodedUrl}`)
    var jsonBlocks = await response.json()
    await context.sendText(`result: ${jsonBlocks.result}`)
  }  
  catch (e) {    
    await context.sendText("try again /help") 
    console.error(e)    
  }
 
}

async function askCommand(context){
  var parseString = context.event.text

  // this will split the string by space 
  var splittedString = parseString.split(" ") 

  // this get the whole equation 
  var eq = splittedString.slice(1, splittedString.length )  
  var searchWord= eq.join(" ");

  try {
    // fetch dsds
    var response = await fetch(`https://api.wolframalpha.com/v2/query?input=${searchWord}&format=plaintext&output=JSON&appid=PRQRG9-5QU2GP4YEW`)
    var jsonBlocks = await response.json()
    var summaryText = ["queryresult"]["pods"]

    //test
    /**
    var parsedSummaryText = summaryText.match(/.{1,640}/g)
    for(i=0; i <parsedSummaryText.length; i++){
      await context.typing(1000);
      await context.sendText(parsedSummaryText[i]);
    }
    **/
    
  }  
  catch (e) {    
    await context.sendText("try again /help") 
    console.error(e)    
  }
}

async function sendHelp(context){
  await context.sendText("Hi kindly choose the some  commands ") 
  await context.sendText(`
  COMMANDS:  
  /search - this will help you to find the top result articles
  /wiki - this will give you anything that's in Wikipedia
  /word - simple dictionary
  /show-math - show you all the math commands

  How to use it? 
  just type:

  /search Hello
  /wiki Hello
  /word Hello
  /show-math (this will show the list of math commands)
  `)
}

async function mathSend(context){
  await context.sendText("Here are the math commands: ") 
  await context.sendText(`
  LIST COMMAND:
  /simplify  
  /factor  
  /derive  
  /integrate  
  /zeroes  
  /tangent  
  /cos
  /sin
  /log 
  `)
}

async function errorMessage(context){
  await context.sendText("Sorry can't get that...\ntype /help for more commands and info") 
}

async function wikiPediaSend(context){
  var parseString = context.event.text

  // this will split the string by space 
  var splittedString = parseString.split(" ") 

  // this get the whole equation 
  var eq = splittedString.slice(1, splittedString.length )  
  var searchWord= eq.join(" ");

  try {
    // fetch dsds
    var response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&origin=*&formatversion=2&exintro&explaintext&redirects=1&titles=${searchWord}`)
    var jsonBlocks = await response.json()
    var summaryText = jsonBlocks["query"]["pages"][0]["extract"]
    //test
    var parsedSummaryText = summaryText.match(/.{1,640}/g)
    for(i=0; i <parsedSummaryText.length; i++){
      await context.typing(1000);
      await context.sendText(parsedSummaryText[i]);
    }
    
  }  
  catch (e) {    
    await context.sendText("try again /help") 
    console.error(e)    
  }
}

async function dictionarySend(context){
  var parseString = context.event.text

  // this will split the string by space 
  var splittedString = parseString.split(" ") 

  // this get the whole equation 
  var eq = splittedString.slice(1, splittedString.length )  
  var searchWord= eq.join(" ");

  try {
    // fetch dsds
    var response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`)
    var jsonBlocks = await response.json();
     var temporaryData = jsonBlocks[0]["meanings"]    
    await context.sendText(temporaryData[0]["definitions"][0]["definition"])
  }  
  catch (e) {
    await context.sendText("try again /help")    
    console.error(e)    
  }
}

async function testCounter(context){
  const count = context.state.count + 1;

  context.setState({
    count,
  });

  await context.sendText(`Test Count: ${count}`);
}

async function googleSearch(context){
  var parseString = context.event.text

  // this will split the string by space 
  var splittedString = parseString.split(" ") 

  // this get the whole equation 
  var eq = splittedString.slice(1, splittedString.length )  
  var searchWord= eq.join(" ");

  try {
    // fetch dsds
    var response = await fetch(`https://google-scraper-zaki.herokuapp.com/searchspecific/${searchWord}`)
    var jsonBlocks = await response.json()
    var summaryText = jsonBlocks[0]
    await context.typing(1000);
    await context.sendText(summaryText["uid"]);
    var parsedSummaryText = summaryText["article"]
    await context.typing(1000);
    for (var i=0; i<parsedSummaryText.length; i++){
    await context.sendText(parsedSummaryText[i]);
    }
    await context.typing(1000);
    await context.sendText("===End of article===");
    
  }  
  catch (e) {    
    await context.sendText("there's error in our side sorry for inconvenient") 
    console.error(e)    
  }
}

module.exports = async function App(context) {

  return router(
    [     
      text(/^\/simplify[]?\s+/,doSolveThis),  
      text(/^\/factor[]?\s+/,doSolveThis),  
      text(/^\/derive[]?\s+/,doSolveThis),  
      text(/^\/integrate[]?\s+/,doSolveThis),  
      text(/^\/zeroes[]?\s+/,doSolveThis),  
      text(/^\/tangent[]?\s+/,doSolveThis),  
      text(/^\/area[]?\s+/,doSolveThis),  
      text(/^\/cos[]?\s+/,doSolveThis),
      text(/^\/sin[]?\s+/,doSolveThis),
      text(/^\/log[]?\s+/,doSolveThis),  
      text(/^\/search[]?\s+/,googleSearch),
      text(/^\/wiki[]?\s+/,wikiPediaSend),
      text(/^\/Wiki[]?\s+/,wikiPediaSend),
      text(/^\/WIKI[]?\s+/,wikiPediaSend),
      text(/^\/wikI[]?\s+/,wikiPediaSend), 
      text(/^\/word[]?\s+/,dictionarySend), 
      text(/^\/Word[]?\s+/,dictionarySend),
      text(/^\/worD[]?\s+/,dictionarySend),      
      text(/^\/show-math[]?/,mathSend),
      text(/^\/help[]?/,sendHelp),      
      text("test", testCounter),
      route('*',errorMessage)

    ]

  );
};