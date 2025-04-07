import wattendance from "../assets/wattendance.png";
import breakingTheBinary from "../assets/breakingthebinary.jpeg";
import timely from "../assets/timely.png";

export const projects = [
    {
      image: wattendance,
      title: "wattendance",
      description: "Attendance tracker with facial recognition",
      date: "Dec 2023",
      skills: "ReactJS, TypeScript, NodeJS, Tailwind CSS, MySQL, OpenCV, Python",
      links: [
        { name: "Github", url: "https://github.com" },
        {
          name: "Demo",
          url: "http://wattendance.s3-website.us-east-2.amazonaws.com",
        },
      ],
    },
    {
      image: breakingTheBinary,
      title: "breaking the binary",
      description:
        "Video game illustrating women's struggles in the tech industry",
      date: "Sept 2023",
      skills: "JavaScript, HTML, CSS, p5.js, Figma",
      links: [
        {
          name: "Devpost",
          url: "https://devpost.com/software/breaking-the-binary",
        },
      ],
      more: "Technova 2023 Winner 🏆",
    },
    {
      image: timely,
      title: "timely",
      description: "Booking system for meeting rooms across campus",
      date: "June 2023",
      skills: "Javascript, HTML, CSS, Java, PHP",
      links: [{ name: "Github", url: "https://github.com/yam101/timely" }],
    },
    {
      title: "coming soon...",
      description: "TBD",
      date: "TBD",
      skills: "TBD",
      links: [{ name: "TBD", url: "https://github.com/yam101" }],
    },
  ];
  