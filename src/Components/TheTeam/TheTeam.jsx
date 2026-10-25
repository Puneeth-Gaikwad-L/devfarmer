import React from "react";
import TeamCards from "../TeamCards/TeamCards";
import { teamMembers } from "../../util/util";

function TheTeam() {
  return (
    <section
      id="about"
      className="scroll-mt-24 theme-section--violet py-16 md:py-20">
      <div className="site-container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase text-brand-cyan">
            About the team
          </p>
          <h2 className="mt-3 text-3xl font-bold leading-tight text-brand-white md:text-4xl">
            Real people behind the work
          </h2>
          <p className="mt-3 text-base leading-relaxed text-brand-muted">
            Skilled minds and dedicated hearts behind every success.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-9 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4">
          {teamMembers.map((member) => (
            <TeamCards
              key={member.name}
              name={member.name}
              position={member.position}
              img={member.img}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TheTeam;
