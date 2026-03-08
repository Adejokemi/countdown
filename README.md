# Event Countdown Dashboard

A modern, responsive dark-themed dashboard built to visualize and track upcoming events, deadlines, and milestones with real-time countdowns. 

## 🚀 Live Demo
**Live Link:** [View Live Demo](https://countdown-sherifat-ajoke.vercel.app/)  
**Repository:** [GitHub Link](https://github.com/Adejokemi/countdown.git)

## 🛠️ Tech Stack

* **Framework:** Next.js (App Router)
* **Language:** TypeScript
* **Styling:** Tailwind CSS
* **State Management:** React Hooks (with LocalStorage persistence)
* **Icons:** Lucide React
* **Typography:** Google Fonts (Inter)

## ✨ Key Features

1.  **Dashboard Snapshot:** Immediate view of the "Most Urgent" event and a grid of upcoming deadlines using a clean, dark-mode aesthetic.
2.  **Visual Tracking:**
    * **Live Timers:** Real-time ticking countdowns down to the second.
    * **Progress Bars:** Visual indicators showing the percentage of time elapsed since the event was created.
3.  **Event Management:**
    * Add new events via a modal overlay with customizable categories/icons (Work, Travel, Birthdays, etc.).
    * Full CRUD functionality: Edit existing events or delete them.
4.  **Immersive Live Mode:** A full-screen, distraction-free view designed for monitoring critical events as the deadline approaches.
5.  **Data Persistence:** All data is saved to `localStorage`, meaning countdowns survive page reloads without requiring a backend.

## 🏃‍♂️ How to Run Locally

1.  **Clone the repository**
    ```bash
    git clone [git@github.com:Adejokemi/countdown.git](https://github.com/Adejokemi/countdown.git)
    cd your-repo-name
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Design Decisions & Trade-offs

* **State Management (Custom Hooks):** I chose to encapsulate state and local storage logic inside a custom `useEvents` hook rather than using a heavy library like Redux or Zustand. The state requirements were highly localized, so a custom hook kept the application lightweight and reduced boilerplate.
* **Architecture:** I separated "Logic" (math calculations in `lib/utils.ts`) from "UI" (components) to keep the code clean and maintainable. The UI elements (`UrgentEventCard`, `LiveDashboard`, `EventModal`) are decoupled so the main page acts simply as an orchestrator.
* **Typography:** I actively chose the `Inter` sans-serif font to ensure maximum legibility for the dashboard's fast-ticking tabular numbers, matching the sleek, tech-focused UI.

## 🚧 Challenges Faced

* **Hydration Mismatches:** Using `localStorage` with Next.js can cause hydration errors (where server HTML differs from client HTML). I solved this by initializing state with an empty array and retrieving the `localStorage` data inside a `useEffect` hook to ensure it runs strictly on the client side.
* **Viewport Clipping on Mobile:** The immersive "Live Dashboard" initially used a strict `fixed inset-0 flex-col` layout, which caused content to overflow and clip silently on smaller mobile screens. I fixed this by decoupling the scrolling container (`overflow-y-auto`) from the content wrapper (`min-h-screen`), allowing it to perfectly center on large screens while scrolling gracefully on mobile.

## 🔮 Future Improvements

If I had more time, I would add:
* **Database Integration:** Swap `localStorage` for a real backend (like Supabase or Firebase) so users can sync their countdowns across their phone and desktop.
* **Image Uploads:** Allow users to upload their own background images for the "Most Urgent" card and Live Dashboard instead of relying on static placeholders.
* **Animations:** Integration with Framer Motion to smoothly animate cards when an event is deleted or when a new event overtakes the #1 spot.
* **Audio Alerts:** An optional browser audio chime that plays when the "Most Urgent" timer officially hits zero.

## ⏱️ Time Spent

* **Approximate time:** ~43 hours (Planning, UI Component design, Logic integration, and Styling).