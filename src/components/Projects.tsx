import { useState } from "react";

import pinkFolderIcon from "../assets/folder-pink.png";
import yellowFolderIcon from "../assets/folder-yellow.png";
import blueFolderIcon from "../assets/folder-blue.png";
import { projects } from "../data/projectData";

const folders = [blueFolderIcon, pinkFolderIcon, yellowFolderIcon];

export default function Project() {
  const [selectedProject, setSelectedProject] = useState(projects[0]);

  return (
    <>
      <div className="folder-header">
        <p>{projects.length} items</p>
      </div>

      <div className="projects-container">
        <div className="projects-list">
          {projects.map((project, index) => (
            <div
              key={index}
              className={`list-item ${
                selectedProject?.title === project.title ? "active" : ""
              }`}
              onClick={() => setSelectedProject(project)}
            >
              <img src={folders[index % 3]} alt={project.title} />
              <p>{project.title}</p>
            </div>
          ))}
        </div>

        {selectedProject && (
          <div className="projects-details">
            <div className="image">
              <img src={selectedProject.image} />
            </div>

            <h3>{selectedProject.title}</h3>

            <p className="description">{selectedProject.description}</p>

            <p className="subheading">Details</p>

            <div className="row">
              <p className="label">Date:</p>
              <p>{selectedProject.date}</p>
            </div>
            <hr />

            <div className="row">
              <p className="label">Skills:</p>
              <p>{selectedProject.skills}</p>
            </div>
            <hr />

            <div className="row">
              <p className="label">Links:</p>

              <div>
                {selectedProject.links?.map((link, index) => (
                  <a href={link.url} key={index}>
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {selectedProject.more && (
              <>
                <hr />
                <div className="row">
                  <p className="label">More:</p>

                  <p>{selectedProject.more}</p>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}
