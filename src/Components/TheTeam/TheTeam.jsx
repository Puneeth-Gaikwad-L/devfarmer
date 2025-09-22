import React from "react";
import TeamCards from "../TeamCards/TeamCards";
import Team3 from "/team-3.png";
import Team4 from "/team-4.png";
import Team5 from "/team-5.png";
import Team6 from "/team-6.png";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

function TheTeam() {

  const teamMembers = [
    {
      name: "Sunil Kumar",
      position: "Digital Marketing Head",
      img: Team6,
      bgColor: "bg-[#E574BC]",
      imgBg: "bg-[#C52184]",
    },
    {
      name: "Mani Poorna",
      position: "Full Stack Developer",
      img: Team4,
      bgColor: "bg-[#A882DD]",
      imgBg: "bg-[#49416D]",
    },
    {
      name: "Puneeth Gaikwad L",
      position: "Full Stack Developer",
      img: Team5,
      bgColor: "bg-[#7D84B2]",
      imgBg: "bg-[#14213D]",
    },
    {
      name: "Prem Darshan",
      position: "Delivery Head",
      img: Team3,
      bgColor: "bg-[#D58936]",
      imgBg: "bg-[#A44200]",
    }
  ];

  return (
    <>
      <div className="px-4 sm:px-0">
        <h3
          style={{ margin: 0 }}
          className="m-0 text-4xl sm:text-5xl md:text-7xl font-bold text-center my-10 sm:my-20 text-purple-800"
        >
          <span className="text-purple-400">The Team </span><br />That Powers Us
        </h3>
        <p
          style={{ margin: 0 }}
          className="text-center text-sm sm:text-base md:text-purple-500"
        >
          Skilled minds and dedicated hearts behind every success.
        </p>
      </div>

      <div className="hidden md:flex w-full h-screen justify-center gap-[3%] items-center">
        {teamMembers.map((member, index) => (
          <TeamCards
            key={index}
            bgColor={member.bgColor}
            imgBg={member.imgBg}
            name={member.name}
            position={member.position}
            img={member.img}
          />
        ))}
      </div>

      {/* Mobile view (Swiper carousel) */}
      <div className="block md:hidden w-full py-10 w-full h-[80dvh]">
        <Swiper
          className="h-full"
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
        >
          {teamMembers.map((member, index) => (
            <SwiperSlide key={index} className="flex justify-center h-full">
              <div className="flex justify-center h-full">
                <TeamCards {...member} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default TheTeam;
