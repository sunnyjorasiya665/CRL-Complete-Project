document.addEventListener("DOMContentLoaded", function () {
  fetch("/projects")
    .then((response) => response.json())
    .then((projects) => {
      const projectsContainer = document.getElementById("projects-container");
      projects.forEach((project) => {
        const projectElement = document.createElement("div");
        projectElement.className = "project";
        projectElement.innerHTML = `
              <h3>${project.projectName}</h3>
              <p>${project.description}</p>
              ${
                project.image
                  ? `<img src="${project.image}" alt="${project.projectName}">`
                  : ""
              }
            `;
        projectsContainer.appendChild(projectElement);
      });
    });
});
