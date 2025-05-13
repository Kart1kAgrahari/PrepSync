import { CHAPTER_NOTES_TABLE, STUDY_MATERIAL_TABLE, STUDY_TYPE_CONTENT_TABLE, USER_TABLE } from "@/configs/schema";
import { inngest } from "./client";
import { db } from "@/configs/db";
import { eq } from "drizzle-orm";
import { generateNotesAiModel, GenerateQuizAiModel, generateStudyTypeContentAiModel } from "@/configs/AiModel";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "1s");
    return { message: `Hello ${event.data.email}!` };
  }
);

export const CreateNewUser = inngest.createFunction(
  { id: 'create-user' },
  { event: 'user.create' },
  async ({ event, step }) => {
    const {user}= event.data;
    

    //get event data
    // const fullName = user?.fullName;
    // const email = user?.primaryEmailAddress?.emailAddress;

    // if (!fullName || !email) {
    //   throw new Error("Missing required user data: fullName or email");
    // }

    const result = await step.run(
      'Check User and create new if not in DB ',
      async () => {
        const result = await db
          .select()
          .from(USER_TABLE)
          .where(eq(USER_TABLE.email, user?.primaryEmailAddress?.emailAddress));

        if (result?.length == 0) {
          //if not, then add to database
          const userResp = await db.insert(USER_TABLE).values({
              userName: user?.fullName,
              email: user?.primaryEmailAddress?.emailAddress,
            }).returning({ id: USER_TABLE.id });
            return userResp;
        }
        return result;
      }
    );
    return 'Success';

  }
  //send welcome email notification 
  
  // to send email notification affter 3 days user joined

);

export const GenerateNotes = inngest.createFunction(
  {id:'generate-course'},
  {event:'notes-generate'},
  async({event,step})=>{
    const {course}=event.data;  // all the records info
    
    //generate notes for each w ai
    const notesResult = await step.run('Generate Chapter Notes',async()=>{
      const Chapters= course?.courseLayout?.chapters;
      let index=0;
      Chapters.forEach(async(chapter)=>{
        const PROMPT='Generate exam material detail content for each chapter, Make syre to include all topic point in the content, make sure to give content in HTML(do not include HTMLKL, Headm Body, title tag), the chapters: '+JSON.stringify(chapter);

        const result = await generateNotesAiModel.sendMessage(PROMPT);
        const aiResp = result.response.text()

        await db.insert(CHAPTER_NOTES_TABLE).values({
          chapterId:index,
          courseId:course?.courseId,
          notes:aiResp,
        })
        index= index+1;
      })
      return 'Completed';
    })
    //update the status to ready

    const updateCourseStatusResult = await step.run('Update course status to ready',async()=>{
      const result = await db.update(STUDY_MATERIAL_TABLE).set({
        status:'Ready'
      }) .where(eq(STUDY_MATERIAL_TABLE.courseId,course?.courseId));
      // 
      return 'Success'
    })
  }
)

// generate flashcard, quix, qa
export const GenerateStudyTypeContent=inngest.createFunction(
  {id:'Generate Study type Content'},
  {event:'studyType.content'},

  async({event,step})=>{

    const {studyType,prompt,courseId,recordId}=event.data

    
    const AiResult= await step.run('generating flashcard using Ai',async()=>{
    const result =
    studyType=='FlashCard'?
    await generateStudyTypeContentAiModel.sendMessage(prompt):
    await GenerateQuizAiModel.sendMessage(prompt)
    const AiResult = await JSON.parse(  result.response.text())
    return AiResult
    })

    //sve the result 
    const dbResult = await step.run('Save result to db', async()=>{
      const result =await db.update(STUDY_TYPE_CONTENT_TABLE)
      .set({
        content: AiResult,
        status:'Ready'
      }).where(eq(STUDY_TYPE_CONTENT_TABLE.id,recordId))
      // .where(eq(STUDY_TYPE_CONTENT_TABLE.type, studyType))
      return 'Inserted Successfully'
    })

  }
)