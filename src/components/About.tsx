import computerIcon from "../assets/computer.png";

export default function About() {
  const getYear = () => {
    return new Date().getFullYear();
  };

  return (
    <div className="about-container">
      <img src={computerIcon} className="computer-icon" />
      <h1>Yasmin Motahhary</h1>
      <span>{getYear()}</span>
      <div className="info">
        <h3>Status</h3>
        <p>Software Engineering student</p>
        <h3>Location</h3>
        <p>University of Waterloo</p>
        <h3>Connect</h3>
        <div className="links">
          <a href="https://github.com/yam101" target="_blank">
            Github
          </a>
          <a
            href="https://www.linkedin.com/in/yasminmotahhary/"
            target="_blank"
          >
            Linkedin
          </a>
          <a href="mailto:ymotahhary@uwaterloo.ca" target="_blank">
            Email
          </a>
        </div>
      </div>
    </div>
  );
}
