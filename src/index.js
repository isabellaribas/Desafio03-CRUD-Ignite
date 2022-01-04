const express = require("express");

const { v4: uuid } = require("uuid");

const app = express();

app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(newRepository);

  return response.status(201).json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, url, techs} = request.body;

  repositoryUpdate = repositories.find(repository => repository.id === id);
  
  if (!repositoryUpdate) {
    return response.status(404).json({ error: "Repository not found" });
  };

  repositoryUpdate.title = title;
  repositoryUpdate.url = url;
  repositoryUpdate.techs = techs;

  return response.status(201).json(repositoryUpdate);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(404).json({ error: "Repository not found" });
  };

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryUpdate = repositories.find(repository => repository.id === id);

  if (!repositoryUpdate) {
    return response.status(404).json({ error: "Repository not found" });
  };

  repositoryUpdate.likes += 1;

  const likes = repositoryUpdate.likes;

  return response.json({likes});
});

module.exports = app;
