// store routes specific to restaurants
const express = require("express");
const uuid = require("uuid");

const resData = require("../utility/restaurant-data");
const restaurantRouter = express.Router();

restaurantRouter.get("/restaurants", function (req, res) {
  let order = req.query.order;
  let nextOrder = "desc";

  if (order !== "asc" && order !== "desc") {
    order = "asc";
  }

  if (order === "desc") {
    nextOrder = "asc";
  }

  const ourRestaurants = resData.getStoredRestaurants();
  ourRestaurants.sort(function (resA, resB) {
    if (
      (order === "asc" && resA.name > resB.name) ||
      (order === "desc" && resB.name > resA.name)
    ) {
      return 1;
    }
    return -1;
  });

  res.render("restaurants", {
    numberOfRestaurants: ourRestaurants.length,
    restaurants: ourRestaurants,
    nextOrder: nextOrder,
  });
});

restaurantRouter.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const ourRestaurants = resData.getStoredRestaurants();

  for (const restaurant of ourRestaurants) {
    if (restaurant.id === restaurantId) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
  }
  // if we do not have a match
  // chaining the methods and browser will show in console that error 404.
  res.status(404).render("404");
});

restaurantRouter.get("/recommend", function (req, res) {
  res.render("recommend");
});

restaurantRouter.post("/recommend", function (req, res) {
  const restaurant = req.body;
  restaurant.id = uuid.v4();
  const ourRestaurants = resData.getStoredRestaurants();

  ourRestaurants.push(restaurant);

  resData.storeRestaurants(ourRestaurants);

  res.redirect("/confirm");
});

restaurantRouter.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = restaurantRouter;
