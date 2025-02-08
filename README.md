# property-manager
# **Project Description**

--------------------------------------------------------------------------
## **High-Level Overview**

Build a small data-driven web application called “Property Explorer”. The app will allow users to:

- View a list of properties in a table
- Filter and search those properties by various criteria (e.g., property name, city, or owner - you can add more and be creative here!)
- Click on a property to view more details (including a map location)
- Implement minimal Role-Based Access Control (RBAC)
- Admin: Can add, edit, and delete properties
- User: Can only view/filter/search properties

You should provide a backend (API + database layer), a minimal frontend (for visualization & interaction), and documentation on setup.

--------------------------------------------------------------------------
## **Requirements Breakdown**

### Backend:

- Use any modern backend language/framework (Node.js, .NET, Python, Java, etc.)
- Expose RESTful endpoints to handle CRUD operations on the “properties” resource
- Store property data in a database (can be SQL-based or NoSQL)
- Demonstrate Role-Based Access Control. For simplicity, storing roles in a hardcoded manner or in the database is fine—just show you know how to handle different privileges
- Show attention to security (e.g., protecting routes that require Admin privileges, correct management of authentication tokens, or an alternative method)

### Database:

- Show your approach to database schema design. We want to see an entity relationship between “Property” and “Owner” (or similar) so that each property has an associated owner
- Provide a simple migration script or at least documentation on how to set it up
- Efficiency considerations (e.g., indexing for search queries) if time permits

### Frontend:

- Can be a simple single-page application or a minimal multi-page setup using any framework (React, Angular, Vue, or even server-side rendering)
- Table view of properties with search and filters
- Click on a property to see more details, possibly on a new route or modal
- A map (or map placeholder) that marks the property’s location. This can be done using a simple integration like Google Maps, Leaflet, or any other service. If time is tight, a static map or a placeholder approach is fine—just demonstrate how you’d integrate

### Security & Confidentiality:

- Implement a login flow where users can authenticate to either get an Admin or User role
- Protect the Admin routes (create, edit, delete) so that only Admins can access them
- Briefly explain how you would handle secrets (API keys, tokens) securely in a production environment (we don’t need a full implementation, but we want to see that you’ve thought it through)

### Documentation & Code Quality:

 Provide a README detailing:

- Tech stack used (and why)
- How to set up and run the project (backend + frontend + database)
- Any design or architectural decisions worth noting (e.g., folder structure, approach to security)
- Show us clean, maintainable code and best practices (folder structure, naming conventions, etc.)

--------------------------------------------------------------------------
## **Deliverables**

- Source Code for both frontend and backend
- A short README with instructions on environment setup and usage
- Any database scripts or instructions for creating/populating the DB

--------------------------------------------------------------------------
## **Final Note**

We do not expect a fully polished, production-level app—just enough to demonstrate your approach, coding proficiency, and architecture design in a time-bound manner.
