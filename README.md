# 🍕 Pizza Menu App

A modern, lightweight pizza ordering app that fetches its menu directly from a backend API. It features a fully functional cart, local storage persistence, a smooth checkout experience (payment on delivery), and live order tracking.

---

## 🚀 Features

- 🔥 Dynamic pizza menu pulled directly from an API
- 🛒 Fully functional cart with item management
- 💾 Persistent cart & user name stored in `localStorage`
- 📋 Checkout system with name prefill from local data
- 📍  Uses geolocation to automatically fill in the user's address
- 🚚 Payment on delivery (no online payment integration)
- ⭐ Priority orders (with additional fees)
- 🧾 Order tracking using unique Tracking ID
- 👤 Logout option to clear user data and start fresh

---

## 🖥️ Tech Stack

- Frontend: React Tailwind CSS
- State & Storage: Local Storage Redux toolkit
- Backend API: External API for menu & order handling

---

## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/zeirrow/pizza-menu-app.git
cd pizza-menu-app
````

### 2. Install Dependencies

If you're using **npm**:

```bash
npm install
```

Or if you're on **Yarn**:

```bash
yarn install
```

### 3. Run the App Locally

```bash
npm run dev
```

Or:

```bash
yarn dev
```

Then go to [http://localhost:5173](http://localhost:5173)

---

## 🧠 How It Works

### 👋 First Visit

* Prompts user to input their **name**.
* Name is saved to `localStorage` and auto-filled during checkout.

### 🛒 Cart System

* Add/remove pizzas to/from cart.
* Cart data is saved to `localStorage`, so it survives reloads.
* Cart is **cleared** when:

  * The user logs out.
  * The user completes an order.

### 🚀 Checkout

* Submit an order with:

  * Name (auto-filled)
  * Pizza list
  * Optional **priority** checkbox (adds extra fee)
* On submit:

  * Order is sent to backend.
  * A **Tracking ID** is generated and returned.

### 📦 Order Tracking

* After placing an order, the user can:

  * Track their order in real-time using the Tracking ID.
  * See the status of the order (e.g., pending, out for delivery, delivered).

### 🔄 Logout

* Users can **log out** anytime to:

  * Clear name from storage
  * Reset cart and checkout state

---

## 📝 Notes

* No actual payment system is used — it assumes **Payment on Delivery**.
* Works best in modern browsers with localStorage enabled.
* Make sure the backend API is running and accessible.

---

## 📁 Project Structure (example)

```
src
  /features
    /cart
    /menu
    /order
    /user
  /services
  /ui
  /utils
  /App.jsx
  /index.css
  /main.jsx
  /store.js 

```
---

## 🤝 Contributing

PRs and ideas welcome. Just fork it, branch off, and send a pull request.

---

## 📜 License

MIT — do what you want with it.

---

## 🔗 Author

Built with 💛 by \[Nnodimele Udodirim]
[GitHub](https://github.com/zeirrow) • [LinkedIn](https://www.linkedin.com/in/udodirim-nnodimele-814b5a287/)
