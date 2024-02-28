import { NEXT_REQUEST_META } from "next/dist/server/request-meta";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function GET(request: Request) {
	return new Response("Hello, Next.js!");
}

export async function POST(request: Request) {
	const { userText } = await request.json();

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: userText }],
	});

	const aiMessage = completion.data.choices[0].message?.content;
	return NextResponse.json({message:aiMessage} , {status : 200});

	// return NextResponse.json(
	// 	{
	// 		message:
	// 			"hey there visitor this is Divyanshu here... the developer who created this creepy project. ",
	// 	},
	// 	{ status: 200 }
	// );
	}
