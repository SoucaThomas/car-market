# Product Requirements Document (PRD)

## Car Marketplace Web Application

---

### 1. Overview

The application is a car marketplace with a modern user interface. It allows users to search for cars, view detailed listings, and interact with dealers. It supports role-based access for guests, registered users, dealers, and admins.

---

### 2. Architecture

- **Frontend:** Next.js with TailwindCSS
- **Backend:** Next.js API Routes
- **Database:** PostgreSQL
- **Authentication:** BetterAuth
- **Deployment:**
  - Frontend: Vercel
  - Backend: Vercel

---

### 3. Roles & Permissions

| **Role** | **Capabilities**                                                                         |
| -------- | ---------------------------------------------------------------------------------------- |
| Guest    | Perform searches, view car listings, and read car details, register/login.               |
| User     | Post car listings, and leave dealer ratings after confirmed purchases.                   |
| Dealer   | Apply for dealer account approval, manage their car listings (add/edit/delete).          |
| Admin    | Manage all users, approve/reject dealer applications, and delete or update car listings. |

---

### 4. User Flow

#### **Guest**

1. Access the homepage with a filtered search form.
2. Perform searches and view car listings (20 per page).
3. Open car details by clicking on car cards.

#### **User**

1. Register/login.
2. Post car listings.
3. Leave dealer ratings (after purchase confirmation).

#### **Dealer**

1. Apply for a dealer account (admin approval required).
2. Add, edit, or delete car listings.

#### **Admin**

1. Approve/deny dealer registration requests.
2. Manage all car listings (CRUD operations).
3. Moderate user activity (e.g., suspend accounts).

---

### 5. Application Pages

#### **Frontend (Next.js):**

- `app/dealerships/page.tsx`: Homepage with filtered search.
- `app/cars/[id]/page.tsx`: Car details page.
- `app/auth/login/page.tsx`: Login form.
- `app/auth/register/page.tsx`: Registration form.
- `app/dealerships/apply/page.tsx`: Dealer application form.
- `app/admin/page.tsx`: Admin dashboard.

#### **Components:**

- `components/CarCard.tsx`: Reusable car listing card.
- `components/SearchForm.tsx`: Search filters.
- `components/Layout.tsx`: Header, footer, and global layout.
- `components/Pagination.tsx`: Pagination for car listings.

#### **UI Design:**

- TailwindCSS is used for responsive design.
- Animations with Framer Motion for transitions.

---

### 6. Database Schema

#### **Users Table**

| Column Name   | Data Type | Description                               |
| ------------- | --------- | ----------------------------------------- |
| id            | String    | Unique identifier for each user           |
| name          | String    | Full name of the user                     |
| email         | String    | Email address (unique)                    |
| password      | String    | Hashed password for authentication        |
| role          | Enum      | User role (e.g., admin, dealer)           |
| isActive      | Boolean   | Indicates if the user is active           |
| emailVerified | Boolean   | Indicates if the user's email is verified |
| image         | String    | URL of the user's avatar                  |
| createdAt     | DateTime  | Timestamp of user registration            |
| updatedAt     | DateTime  | Timestamp of last profile update          |

#### **Dealers Table**

| Column Name     | Data Type | Description                                                           |
| --------------- | --------- | --------------------------------------------------------------------- |
| id              | Int       | Unique identifier for each dealer                                     |
| userId          | String    | Reference to the user who is a dealer                                 |
| businessName    | String    | Name of the dealership                                                |
| businessEmail   | String    | Contact email for the dealership                                      |
| businessType    | String    | Type of business                                                      |
| taxId           | String    | Tax identification number                                             |
| yearEstablished | DateTime? | Year the dealership was established                                   |
| website         | String?   | Website URL of the dealership                                         |
| streetAddress   | String    | Street address of the dealership                                      |
| city            | String    | City where the dealership is located                                  |
| state           | String    | State where the dealership is located                                 |
| zipCode         | String    | Zip code of the dealership                                            |
| inventorySize   | String    | Number of vehicles in inventory                                       |
| specialties     | String?   | Specialties of the dealership                                         |
| termsAgreed     | Boolean   | Indicates if terms were agreed                                        |
| status          | Enum      | Current status of the application (e.g., approved, pending, rejected) |
| createdAt       | DateTime  | Timestamp of dealer application                                       |

#### **Application Status Enum**

| Value    | Description                   |
| -------- | ----------------------------- |
| pending  | Application is under review   |
| approved | Application has been approved |
| rejected | Application has been rejected |

#### **Listing Table**

| Column Name | Data Type | Description                                                       |
| ----------- | --------- | ----------------------------------------------------------------- |
| id          | Int       | Unique identifier for each listing                                |
| userId      | String    | Reference to the user who created the listing                     |
| carBrand    | String?   | Brand of the car                                                  |
| carModel    | String?   | Model of the car                                                  |
| year        | Int?      | Year of manufacture                                               |
| title       | String?   | Title of the listing                                              |
| price       | Float?    | Price of the car                                                  |
| engineSize  | Float?    | Size of the engine                                                |
| country     | String?   | Country of the car                                                |
| fuelType    | String?   | Type of fuel used                                                 |
| drive       | String?   | Drive type (e.g., FWD, RWD)                                       |
| color       | String?   | Color of the car                                                  |
| description | String?   | Description of the car                                            |
| condition   | String?   | Condition of the car                                              |
| mileage     | Float?    | Mileage of the car                                                |
| status      | Enum      | Current status of the listing (e.g., pending, approved, rejected) |
| createdAt   | DateTime  | Timestamp of listing creation                                     |

#### **Upload Table**

| Column Name | Data Type | Description                                         |
| ----------- | --------- | --------------------------------------------------- |
| key         | String    | Unique identifier for each upload                   |
| url         | String    | URL of the uploaded file                            |
| name        | String    | Name of the uploaded file                           |
| type        | String    | Type of the uploaded file                           |
| size        | Int       | Size of the uploaded file                           |
| createdAt   | DateTime  | Timestamp of upload creation                        |
| userId      | String    | Reference to the user who uploaded the file         |
| listingId   | Int?      | Reference to the listing associated with the upload |
