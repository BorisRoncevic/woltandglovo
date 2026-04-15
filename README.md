# Food Ordering Application

## Overview

This project is a full-stack web application for ordering food, inspired by platforms such as Wolt and Glovo. It supports both guest users and authenticated users, with a focus on realistic cart handling and order management.

---

## Core Features

### Authentication

* User registration and login
* JWT-based authentication
* Stateless backend with token validation
* Username extracted from token via filter and used across services

---

### Cart System

* Guest users can add items to cart using a generated `guestId`
* Authenticated users have a persistent cart stored in the database
* Automatic cart merging when a guest logs in

#### Cart Merge Logic

When a guest user logs in:

* The guest cart is retrieved using `guestId`
* The user cart is retrieved using user ID
* Items are merged:

  * If an item exists in both carts, quantities are combined
  * Otherwise, the item is added to the user cart
* The guest cart is deleted after merging

This behavior replicates how real-world applications handle anonymous users.

---

### Restaurants and Menu

* Restaurants can be browsed by city
* Each restaurant has its own menu (items)
* Users can view items and add them to the cart

---

### Owner Functionality

* Authenticated users can create restaurants
* Each user can view their own restaurants
* Items can be added to a restaurant menu
* Orders for a specific restaurant can be managed:

  * Accept or reject orders
  * Mark orders as picked up

---

### Order System

* Users can create orders from their cart
* Orders follow a defined lifecycle:

```
PENDING → ACCEPTED → PREPARING → DELIVERING → DELIVERED
```

* Two perspectives are supported:

  * Customer: viewing their own orders
  * Owner: viewing orders per restaurant

---

## Technology Stack

### Backend

* Java (Spring Boot)
* Spring Security (JWT)
* Hibernate / JPA
* MySQL

### Frontend

* React (TypeScript)
* React Router
* Context API (authentication and cart state)

---

## Summary

The application demonstrates:

* JWT-based authentication
* Separation of guest and authenticated user behavior
* Cart merging logic
* Order lifecycle management
* Basic role separation between users and restaurant owners

This project focuses on replicating common patterns used in production food delivery systems.
