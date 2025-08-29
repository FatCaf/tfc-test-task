# User Dashboard Application

## Overview

This project is a **React + TypeScript dashboard** that allows browsing, filtering, and viewing details of users. It includes infinite scrolling, virtualization, sorting, filtering, and a detailed user page with order history.

---

## Features

### Dashboard Page

- **User List/Grid**: Displays all users with name, email, and avatar.
- **Infinite Scrolling & Virtualization**: Efficient rendering for large datasets using virtualized lists.
- **Filters**: Three filters implemented:
    - Country (input)
    - Gender (select)
    - City (input)
    - State (input)
- **Dynamic Filtering**: Filters update the user list in real-time.

### User Details Page

- Displays all information about the selected user, including:
    - Contact details
    - Address
    - Additional metadata
    - Order history
- Navigation back to the dashboard/list view.

### Orders

- **Order History**: Displays order number, date, and total amount for each order.
- **Orders List/Table**: Orders are rendered in a scrollable list format.
- **Lazy Loading**: Orders are lazy-loaded for performance optimization.

### Additional Features

- Sorting for user orders (ascending/descending).
- URL query + localStorage state persistence for sorting and filters.
- Responsive design for desktop, tablet, and mobile.
- Custom hooks for filtering (`useFilter`) and sorting (`useSort`).

---

## Additional Technologies Used

- **Tailwind CSS**: Used for utility-first styling to speed up development and maintain a consistent design.
- **react-virtualized**: Enables virtualization for large lists, ensuring smooth scrolling and high performance with big datasets.
- **Vitest**: Lightweight and fast testing library used for unit tests on custom hooks (`useSort`, `useFilter`, `useInfiniteScroll`) and critical functionality.

Each of these technologies was chosen to **improve development speed, maintainability, and performance**:

- Tailwind allows rapid styling without writing custom CSS for every component.
- react-virtualized efficiently renders only visible list items, reducing DOM node count and improving UI responsiveness.
- Vitest provides a modern, fast testing environment with good TypeScript support, enabling reliable unit tests.

---
## How to Run

### 1. Live Demo

You can view the live application here:  
[https://tfc-tets-task.netlify.app/](https://tfc-tets-task.netlify.app/)

### 2. Install Dependencies

Ensure you have [Node.js](https://nodejs.org/) installed. Then, run:

```bash
npm install && npm run dev
```
To run tests

```bash
npm run test
or
npm run test:ui
```
