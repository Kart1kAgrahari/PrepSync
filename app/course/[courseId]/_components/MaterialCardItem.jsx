import { Button } from "@/components/ui/button";
import axios from "axios";
import { RefreshCcw } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

function MaterialCardItem({ item, studyTypeContent,course,refreshData }) {

  const[loading, setLoading] = useState(false);
  const GenerateContent=async()=>{
    toast('Your content is generating please wait')
    setLoading(true);
    // console.log(course?.courseLayout?.chapters)
    let chapters=''
    course?.courseLayout?.chapters.forEach((chapter)=>{
      chapters=chapter.chapterTitle+','+chapters
    })
    // console.log(chapters)
    const result = await axios.post('/api/study-type-content',{
      courseId:course?.courseId,
      type:item.name,
      chapters:chapters,


    })
    setLoading(false);
    console.log(result)
    refreshData(true)
    toast('Content generated, Happy Learning')
  }

    const isContentReady = studyTypeContent?.[item.type]?.length > 0;

  return (
    <Link href={'/course/' + course?.courseId + item.path}>
      <div
        className={`border shadow-md rounded-lg p-5 flex flex-col items-center
        ${!isContentReady && "grayscale"}`
        }
      >
        {!isContentReady ? (
          <h2 className="p-1 px-2 bg-gray-500 text-white rounded-full text-[10px] mb-2">
            Generate
          </h2>
        ) : (
          <h2 className="p-1 px-2 bg-green-500 text-white rounded-full text-[10px] mb-2">
            Ready
          </h2>
        )}

        <Image src={item.icon} alt={item.name} height={50} width={50} />
        <h2 className="font-medium mt-3">{item.name}</h2>
        <p className="text-gray-500 text-sm text-center">{item.desc} </p>

        {!isContentReady ? (
          <Button className="mt-3 w-full" variant="outline" onClick={() => GenerateContent()}>
            {loading && <RefreshCcw className="animate-spin" />}
            Generate
          </Button>
        ) : (
          <Button className="mt-3 w-full" variant="outline">
            View
          </Button>
        )}
      </div>
    </Link>
  );
}

export default MaterialCardItem;
