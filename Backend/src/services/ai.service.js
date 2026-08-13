import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { response } from "express";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: "your-api-key"
});

export async function testAi(){
    model.invoke("Why do parrots talk?").then((response) => {
        console.log(response.text);
    })
}