// store routes specific to restaurants
const express = require("express");
const uuid = require("uuid");

const resData = require("../utility/restaurant-data");
const restaurantRouter = express.Router();

restaurantRouter.get("/restaurants", function (req, res) {
  const restaurants = resData.getStoredRestaurants();

  res.render("restaurants", {
    numberOfRestaurants: restaurants.length,
    restaurants: restaurants,
  });
});

restaurantRouter.get("/restaurants/:id", function (req, res) {
  const restaurantId = req.params.id;

  const restaurants = resData.getStoredRestaurants();

  for (const restaurant of restaurants) {
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
  const restaurants = resData.getStoredRestaurants();

  restaurants.push(restaurant);

  resData.storeRestaurants(restaurants);

  res.redirect("/confirm");
});

restaurantRouter.get("/confirm", function (req, res) {
  res.render("confirm");
});

module.exports = restaurantRouter;
