import React from "react";
import TeamCards from "../TeamCards/TeamCards";
import Team3 from "/team-3.png";
import Team4 from "/team-4.png";
import Team5 from "/team-5.png";
import Team6 from "/team-6.png";

function TheTeam() {
  return (
    <>
      <div>
        <h3 className="text-7xl font-bold text-center my-20 text-indigo-800">
          <span className="text-indigo-400">Meet</span> The Team
        </h3>
      </div>
      <div className="w-full h-screen flex justify-center gap-[3%] items-center bg-[#1c1c1c">
        <TeamCards
          bgColor={"bg-[#7D84B2]"}
          imgBg={"bg-[#14213D]"}
          name={"Puneeth Gaikwad L"}
          position={"Full Stack Developer"}
          img={Team5}
        />
        <TeamCards
          bgColor={"bg-[#E574BC]"}
          imgBg={"bg-[#C52184]"}
          name={"Sunil Kumar"}
          position={"Digital Marketing Head"}
          img={Team6}
        />
        <TeamCards
          bgColor={"bg-[#D58936]"}
          imgBg={"bg-[#A44200]"}
          name={"John Deo"}
          position={"Delivery Head"}
          img={Team3}
        />
        <TeamCards
          bgColor={"bg-[#A882DD]"}
          imgBg={"bg-[#49416D]"}
          name={"Virat Kohli"}
          position={"cricket player"}
          img={Team4}
        />
      </div>
    </>
  );
}

export default TheTeam;
