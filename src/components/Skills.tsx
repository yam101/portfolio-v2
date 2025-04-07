import { skills } from "../data/skillData";

export default function Skills() {
  return (
    <>
      <div className="folder-header">
        <p>{skills.length} items</p>
      </div>
      <div className="skills-body">
        {skills.map((skill, index) => (
          <div key={index} className="skill">
            <img src={skill.icon} alt={skill.label} />
            <p>{skill.label}</p>
          </div>
        ))}
      </div>
    </>
  );
}
