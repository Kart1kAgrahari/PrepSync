import { courseOutline } from "@/configs/AiModel";
import { db } from "@/configs/db";
import { STUDY_MATERIAL_TABLE } from "@/configs/schema";
import { inngest } from "@/inngest/client";
import { NextResponse } from "next/server";
// import {courseOutlineAIModel} from "@/configs/AiModel"

export async function POST(req){

    const {courseId,topic,courseType,difficultyLevel,createdBy,status}= await req.json()
    //geberate course layout
    const PROMPT='Generate a study material for '+topic+' for '+courseType+' and level of difficulty will  be '+ difficultyLevel +' with the course title, difficulty level,summary of course, list of chapters along with summary for each chapter, topic list in each chapter, finally give in JSON format'
    // const aiResp= await courseOutlineAIModel.sendMessage(PROMPT)
    const aiResp = await courseOutline.sendMessage(PROMPT)
    const aiResult= JSON.parse(aiResp.response.text())


    // save result along wirth user inoput
    const dbResult = await db.insert(STUDY_MATERIAL_TABLE).values({
        courseId:courseId,
        courseType:courseType,
        createdBy:createdBy,
        topic:topic,
        courseLayout:aiResult,
        status:status || 'Generating'

    }).returning({resp:STUDY_MATERIAL_TABLE})


    //trigger the inngest fx to generte chapter notes

    const result= await inngest.send({
        name: 'notes-generate',
        data:{
            course: dbResult[0].resp
        }
    })
    console.log(result);



// console.log(dbResult)
    return NextResponse.json({result:dbResult[0]})
}