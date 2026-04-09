import React from "react";
import JobCard from "../components/JobCard.jsx";

export const Jobs = ()=>{
  const jobs = [
    {
      id: 1,
      company: "Invision",
      title: "Sr. Frontend Engineer",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
      experience: "2 Years",
      salary: "180-250k",
      logo: "https://images.squarespace-cdn.com/content/v1/5ede2122e582b96630a4a73e/1609375996518-DZU53FYNB3FMBYB1JHG6/HP-logo+2021.jpg",
    },
    {
      id: 2,
      company: "Google",
      title: "Full Stack Developer",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
      experience: "3+ Years",
      salary: "150-200k",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzjVKPJ0qGCFLezgUQML6f8Xtj9DLsI8EwlQ&s",
    },
    {
      id: 3,
      company: "Spotify",
      title: "UI/UX Designer",
      description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna.",
      experience: "1 Year",
      salary: "100-140k",
      logo: "https://images.squarespace-cdn.com/content/v1/5ede2122e582b96630a4a73e/1609375996518-DZU53FYNB3FMBYB1JHG6/HP-logo+2021.jpg",
    },
  ];

  return (
  <div className="max-w-7xl mx-auto p-6">
    <div>
      <h1 className="text-3xl">Explore Career Opportunities</h1>
    </div>
    {jobs.map((job, i)=>(
      <JobCard jobData={job} key={job.id}></JobCard>
    ))}
  </div>
  );
}