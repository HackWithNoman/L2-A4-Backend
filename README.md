# SkillBridge 🎓

**Connect with Expert Tutors, Learn Anything.** SkillBridge is a robust full-stack marketplace that bridges the gap between eager learners and expert educators. Whether you are looking to master a new language, dive into coding, or ace your exams, SkillBridge makes finding and booking the right tutor seamless.

---

## 🚀 Key Features

### **For Students**

* **Search & Discovery:** Filter tutors by subject, price, and rating.
* **Instant Booking:** View real-time availability and secure sessions instantly.
* **Review System:** Share feedback and help the community by rating tutors after sessions.
* **Personal Dashboard:** Manage upcoming lessons and track your learning history.

### **For Tutors**

* **Profile Management:** Showcase your expertise, subjects, and introductory videos.
* **Availability Tool:** Flexible scheduling with custom time-slot management.
* **Session Tracking:** Stay organized with a dedicated view of all teaching appointments.

### **For Admins**

* **User Moderation:** Oversee platform safety by managing user statuses (Ban/Unban).
* **Content Control:** Manage subject categories and monitor site-wide booking activity.

---

## 🛠️ Tech Stack

This project is built using a modern development workflow:

* **Frontend:** React.js / Next.js (Tailwind CSS for styling)
* **Backend:** Node.js with Express
* **Database:** PostgreSQL / MongoDB (Managed via Prisma ORM)
* **Authentication:** JWT (JSON Web Tokens) with role-based access control (RBAC)

---

## 📂 Project Structure & Logic

### **Database Schema**

The system is built on a relational architecture to ensure data integrity:

* **Users:** Core auth data and role identification.
* **TutorProfiles:** Extended data for tutors (Bio, hourly rate, subjects).
* **Bookings:** The link between student and tutor, including status (Confirmed, Completed, Cancelled).
* **Reviews:** One-to-many relationship linked to tutor profiles.

### **User Flows**

The application follows a strict state-based logic for bookings:

1. **Student** books a slot  Status: `CONFIRMED`.
2. **Tutor** finishes the lesson  Status: `COMPLETED`.
3. **Student** decides to opt-out  Status: `CANCELLED`.

