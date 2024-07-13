document.addEventListener("DOMContentLoaded", () => {
  async function fetchProjects() {
    try {
      const response = await fetch("/js/projects.json");
      const data = await response.json();
      displayProjects(data.projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
  }

  function displayProjects(projects) {
    const projectsContainer = document.getElementById("projects-container");
    projects.forEach((project) => {
      const projectElement = document.createElement("div");
      projectElement.classList.add("card", "project-card");
      projectElement.style.width = "18rem";

      projectElement.innerHTML = `
          <img src="${project.image}" class="card-img-top" alt="${project.name}">
          <div class="card-body">
            <h5 class="card-title">${project.name}</h5>
            <p class="card-text">${project.description}</p>
            <a target="main" href = "${project.links}">Read More...</a>
            <p class="card-text"><strong>Status:</strong> ${project.status}</p>
          </div>
        `;

      projectsContainer.appendChild(projectElement);
    });
  }

  fetchProjects();
});
