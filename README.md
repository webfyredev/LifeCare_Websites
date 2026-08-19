# LifeCare — Healthcare Management Platform

LifeCare is a modern, full-stack healthcare platform designed to provide patients with convenient access to healthcare services while giving doctors the tools they need to manage appointments, patients, prescriptions, medical notes, and communication.

The platform combines a responsive public-facing hospital website with a secure portal system featuring **role-based patient and doctor dashboards**.

**Live Website:** https://life-care-websites.vercel.app/

---

## Overview

LifeCare was built to demonstrate how a modern healthcare platform can bring together a professional hospital website, authentication, role-based access, patient management, doctor workflows, and API-driven data into one application.

The application consists of two major areas:

**Public Healthcare Website**
**Authenticated Healthcare Portal**

The portal provides different experiences depending on whether the authenticated user is a **Patient** or **Doctor**.

---

## Key Features

### Public Website

The public-facing website provides visitors with information about the healthcare organization and its services.

* Responsive landing page
* About LifeCare
* Healthcare services
* Emergency information
* Find doctors
* Doctor profiles
* Healthcare facilities
* FAQs
* Testimonials
* Blog section
* Contact page
* Newsletter subscription
* Responsive navigation
* Modern animations and interactions

---

# Authentication & Authorization

LifeCare includes a complete authentication flow connected to the backend API.

### Authentication Features

* User registration
* User login
* Google authentication
* Forgot password
* Password reset
* Protected routes
* Persistent authentication state
* Logout functionality
* Role-based portal access

Authenticated users are redirected to the appropriate portal based on their role.

### User Roles

| Role    | Portal            |
| ------- | ----------------- |
| Patient | Patient Dashboard |
| Doctor  | Doctor Dashboard  |

The application uses protected routes to prevent unauthorized users from accessing portal pages.

---

# Patient Portal

The Patient Portal provides users with a centralized location to manage their healthcare activities.

### Patient Dashboard

Patients can access:

* Personal dashboard overview
* Appointment management
* Medical records
* Prescriptions
* Medications
* Messages
* Notifications
* Account settings

### Appointments

Patients can:

* View appointments
* Monitor appointment information
* Manage their upcoming healthcare appointments
* Keep track of their appointment history

### Medical Records

Patients can access their available medical information and healthcare records through their portal.

### Prescriptions & Medications

The patient portal provides dedicated sections for:

* Prescriptions
* Medication information
* Prescription history

### Messages

Patients can communicate through the portal's messaging functionality.

### Notifications

Patients can receive and view relevant notifications from the healthcare system.

### Settings

Patients have access to account and profile-related settings.

---

# Doctor Portal

The Doctor Portal provides healthcare professionals with tools for managing their patients and daily clinical activities.

### Doctor Dashboard

Doctors can access:

* Dashboard overview
* Appointments
* Patients
* Patient details
* Medical notes
* Prescriptions
* Messages
* Notifications
* Doctor profile

### Patient Management

Doctors can:

* View their patients
* Access individual patient details
* Review relevant patient information
* Manage patient-related healthcare workflows

### Appointment Management

Doctors can view and manage their scheduled appointments through their dashboard.

### Medical Notes

Doctors have a dedicated medical notes section for documenting relevant patient information.

### Prescription Management

Doctors can create and manage prescriptions through the prescription workflow.

### Messaging

Doctors can communicate with patients through the integrated messaging system.

### Notifications

Doctors can receive relevant system and appointment notifications.

### Doctor Profile

Doctors can manage and view their professional profile information.


# Tech Stack

## Frontend

* **React 19**
* **Vite**
* **JavaScript / JSX**
* **Tailwind CSS**
* **React Router**
* **Axios**

## UI & Animation

* **Framer Motion**
* **React Icons**
* **Swiper**
* **React Typed**
* **React CountUp**
* **React Intersection Observer**

## Data Visualization

* **Recharts**

## Authentication

* **Google OAuth**
* Custom authentication flow
* Protected routes
* Role-based access control

The project's current `package.json` confirms the React, Vite, Tailwind CSS, Axios, React Router, Framer Motion, Recharts, Swiper, React Icons, and Google OAuth dependencies.

## Backend

The frontend communicates with a dedicated backend/API responsible for application data, authentication, user roles, appointments, patient information, prescriptions, and other portal functionality.

**Backend:** Django + Django REST Framework
**Database:** PostgreSQL

---

# API Integration

LifeCare uses an API-driven architecture.

The frontend communicates with the backend using **Axios**, allowing portal data and user interactions to be handled dynamically rather than relying solely on static frontend data.

The API layer is separated from the UI, making the application easier to maintain and allowing frontend components to communicate with backend services in a structured way.

---

# 🔒 Protected Routes

Portal pages are protected using authentication-aware routing.

Unauthenticated users cannot directly access protected patient or doctor pages.

The general flow is:

```text
User
  │
  ▼
Login / Register
  │
  ▼
Authentication
  │
  ▼
Determine User Role
  │
  ├───────────────┐
  ▼               ▼
Patient          Doctor
  │               │
  ▼               ▼
Patient Portal   Doctor Portal
```

The repository contains a dedicated `protectedRoute` component and authentication context for handling this behavior.

---

# 📱 Responsive Design

LifeCare is designed to provide a consistent experience across:

* Desktop
* Laptop
* Tablet
* Mobile devices

The interface uses responsive layouts, reusable components, animations, and mobile-friendly navigation to provide a modern healthcare experience.

---

#  Deployment

The frontend is deployed on **Vercel**.

### Live Application

 https://life-care-websites.vercel.app/

The repository also includes Vercel configuration through `vercel.json`.

---

# Project Goals

LifeCare was built to demonstrate the development of a real-world healthcare platform rather than a simple static website.

The project focuses on:

* Real-world frontend architecture
* REST API integration
* Authentication
* Authorization
* Protected routes
* Role-based dashboards
* Healthcare workflow management
* Responsive UI development
* Reusable React components
* API-driven application state
* Modern user experience

---

# What This Project Demonstrates

This project demonstrates practical experience with:

* Building production-style React applications
* Structuring large frontend applications
* Designing reusable components
* Integrating REST APIs
* Managing authentication state
* Implementing protected routes
* Handling role-based access
* Creating dashboard interfaces
* Building responsive layouts
* Working with asynchronous API requests
* Creating data visualizations
* Implementing animations and interactive UI
* Deploying frontend applications to Vercel

---

# Future Improvements

Potential future improvements include:

* Real-time messaging with WebSockets
* Advanced healthcare analytics
* More granular permissions
* Automated appointment reminders
* Automated frontend testing
* CI/CD pipeline
* Enhanced API documentation

---

#  Author

**Oyinlade Oyinloye**

Full Stack Developer focused on building modern, responsive, and scalable web applications.

🌐 **Portfolio:** https://oyinladeportfolio.vercel.app/

💻 **GitHub:** https://github.com/webfyredev

---

## License

This project is developed as a portfolio and demonstration project.

© 2026 Oyinlade Oyinloye. All rights reserved.
