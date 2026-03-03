# Baked Fantasy – Frontend Application

## Overview

Baked Fantasy Frontend is the client-side application built using React.js & TailwindCSS. It serves as the user interface for The Baked Fantasy platform, enabling customers to browse products, purchase bakery essentials, enroll in courses, and manage their accounts.

The application communicates with the Baked Fantasy Backend API to handle authentication, product management, cart operations, orders, and course video access.

## Tech Stack

- React.js (Vite)
- TailwindCSS
- React Router
- Axios
- JWT Authentication
- Google OAuth Integration

## Key Features

- User Registration & Login
- Google Authentication
- Secure JWT-based Session Handling
- Product Listing & Filtering
- Bakery Essentials Display
- Category & Sub-Category Browsing
- Add to Cart & Cart Management
- Order Placement
- Course Enrollment
- Online & Offline Course Video Access
- Protected Routes
- Responsive UI Design

## Installation

```bash
git clone https://github.com/iunoware/baked-fantasy-client.git
cd baked-fantasy-client
npm install
```

## Backend Dependency

This frontend application requires the Baked Fantasy Backend server to be running.
Ensure the backend API URL is correctly configured in the environment variables.

## Running the Application

```bash
npm run dev
```

## Build for Production

```bash
# for build
npm run build

# for preview of the dist folder
npm run preview
```

---

## Admin Module Structure (Products & Essentials)

### Product

- CadesAdmin (page) => whole page category
- CategoryCardAdmin (component) => category card
- IndividualCakesAdmin (page) => whole page products
- ProductTableAdmin (component) => individual product table

### Essentials

- EssentialsAdmin (page) => whole page category
- EssentialsCategoryCardAdmin (component) => category card
- IndividualEssentialsAdmin (page) => whole page essentials
- EssentialsTableAdmin (component) => individual essentials table

---

## Contributions

This repository is maintained by **Iunoware Pvt Ltd** for The **Baked Fantasy project**.

- Only authorized team members are allowed to contribute.
- Each contributor must work on their own separate branch.
- Direct commits to the main branch are not allowed.
- All changes must be submitted through pull requests and reviewed before merging.

© Iunoware Pvt Ltd.
All rights reserved.

This codebase is proprietary and intended for official use only.

## Website link

[Link](https://thebakedfantasy.com)
