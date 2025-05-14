"use client";
import { BookCheck, LayoutDashboard, Shield, Text, UserCircle } from "lucide-react";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { CourseCountContext } from "@/app/_context/CourseCountContext";
import { userButtonRef } from "./DashboardHeader";

function Sidebar() {
  const MenuList = [
    {
      name: "DashBoard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Mock Interview",
      icon: BookCheck,
      path: "/",
    },
    {
      name: "Upgrade",
      icon: Shield,
      path: "/dashboard/upgrade",
    },
    {
      name: "Profile",
      icon: UserCircle,
       path: "/dashboard/profile",
    },
  ];
  const {totalCourse, setTotalCourse} = useContext(CourseCountContext)
  const path = usePathname();

  return (
    <div className="h-screen shadow-md p-5">
      <div className="flex gap-2 items-center">
        <Image src={"/logo.svg"} alt="logo image" width={40} height={40} />
        <h2 className="font-bold text-2xl">PrepSync</h2>
      </div>

      <div className="mt-10">
        <Link href={'/create'} className="w-full">
        <Button > + Create New</Button>
        </Link>
        <div className="mt-5">
         
{MenuList.map((menu, index) =>
            menu.action ? (
              <div
                key={index}
                className="flex gap-5 items-center p-3 hover:bg-slate-200 rounded-lg cursor-pointer mt-3"
                onClick={menu.action}
              >
                <menu.icon />
                <h2>{menu.name}</h2>
              </div>
            ) : (
              <Link key={index} href={menu.path} className="block">
                <div
                  className={`flex gap-5 items-center p-3 
                    hover:bg-slate-200 rounded-lg cursor-pointer mt-3
                    ${path === menu.path ? "bg-slate-200" : ""}`}
                >
                  <menu.icon />
                  <h2>{menu.name}</h2>
                </div>
              </Link>
            )
          )}
        </div>
      </div>

          <div className='border p-3 bg-slate-100 rounded-lg
          absolute bottom-10 w-[85%]'>
            <h2 className="text-lg"> Available Credits: {5-totalCourse}</h2>
            <Progress value={(totalCourse/5)*100}></Progress>
            <h2 className="text-sm"> {totalCourse} out of 5 credits used</h2>

            <Link href={'/dashboard/upgrade'} className='text-primary text-xs mt-3'> Upgrade to create more</Link>
          </div>
          
    </div>
  );
}

export default Sidebar;
