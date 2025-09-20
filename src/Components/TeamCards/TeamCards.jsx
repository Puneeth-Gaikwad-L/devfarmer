import React from "react";

function TeamCards({bgColor, name, position, img, imgBg}) {
  return (
    <div className={`w-[50%] h-[80%] sm:w-[15%] sm:h-[90%] ${bgColor || "bg-red-500"} rounded-full overflow-hidden flex flex-col`}>
      {/* Top text section */}
      <div className="flex flex-col items-center justify-center flex-1">
        <h3 className="font-semibold">{name}</h3>
        <p className="text-sm">{position}</p>
      </div>

      {/* Bottom section */}
      <div className={`w-full h-[75%] ${imgBg} rounded-t-full bg-cover bg-center`} style={{backgroundImage: `url(${img})`}}>
        {/* Image placeholder */}
      </div>
    </div>
  );
}

export default TeamCards;
