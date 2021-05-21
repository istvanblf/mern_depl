const petController = require("../controllers/pet.controller");

// LEADING SLASHES ON URLS REQUIRED!

// Django urls.py: path("api/pets", views.allpets)

// Export a function to be called in server.js
module.exports = (app) => {
  app.post("/api/pets", petController.create);
  app.get("/api/pets", petController.getAll);
  /* 
  This route has to come above the other get because :id will think the
  word "random" is the :id if the :id route is above it.
  */
  // app.get("/api/pets/random", petController.random);
  app.get("/api/pets/:id", petController.getOne);
  app.delete("/api/pets/:id", petController.delete);
  app.put("/api/pets/:id", petController.update);
};
