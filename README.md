# 🍽️ What's for Dinner?
**WORK IN PROGRESS**
A full-stack meal planning app built with **React** (frontend) and **ASP.NET Core Web API** (backend), designed to help you manage upcoming meals, generate grocery lists, and streamline dinner decisions.

---

## 🚀 Features

- 🍽️ **Add, remove, and browse meals**
- 🎲 **Randomly pick "Tonight’s Dinner"**
- 🛒 **Automatically generate a grocery list**
- ✍️ **Add ingredients on the fly**
- 📡 **Deployed with Docker + Unraid**
- 🧠 **API-first design with Swagger & RESTful routes**

---

## 🛠 Tech Stack

| Frontend       | Backend            | DevOps / Infra    |
|----------------|--------------------|-------------------|
| React 19       | .NET 8 Web API     | Docker & NGINX    |
| React Router   | EF Core + SQL      | Unraid (Docker)   |
| Vite / CRA     | Swagger UI         | GitHub + VS Code  |

---

## 📦 Project Structure

```
📁 whats-for-dinner-react/
├── public/
├── src/
│   ├── components/
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── AddDishPage.js
│   │   └── GroceryListPage.js
│   ├── Layout.js
│   └── App.js
├── Dockerfile
├── nginx.conf
└── .env (for REACT_APP_API_BASE)
```

```
📁 WhatsForDinnerApi/
├── Controllers/
├── Data/
├── Models/
├── Properties/
├── Program.cs
├── appsettings.json
└── Dockerfile
```

---

## 🧪 Local Dev Setup

### 🔧 Prerequisites
- Node.js 20+
- .NET 8 SDK
- Docker + Docker Compose
- SQL Server (local or Docker)
- Git

### 🖥 Frontend

```bash
cd whats-for-dinner-react
npm install
echo "REACT_APP_API_BASE=http://localhost:5002" > .env
npm start
```

### 🖥 Backend

```bash
cd WhatsForDinnerApi
dotnet restore
dotnet run
```

---

## 🐳 Docker Deployment (Unraid)

1. **Build & push backend image:**

```bash
docker build -t whatsfordinnerapi .
docker tag whatsfordinnerapi 192.168.x.x:5000/whatsfordinnerapi
docker push 192.168.x.x:5000/whatsfordinnerapi
```

2. **React build & push (via script):**

```bash
./deploy-react-to-unraid.sh
```

---

## ✅ API Endpoints

| Method | Endpoint                       | Description                    |
|--------|--------------------------------|--------------------------------|
| GET    | `/api/upcomingmenu`            | List upcoming meals            |
| POST   | `/api/upcomingmenu/{id}`       | Add meal to menu               |
| DELETE | `/api/upcomingmenu/{id}`       | Remove meal from menu          |
| GET    | `/api/upcomingmenu/grocerylist`| Return summarized ingredients  |
| GET    | `/swagger`                     | Swagger docs                   |

---

## 💡 To-Do List

- **User Authentication with Role-Based Access Control (RBAC)**: Implement user authentication with roles to control access to different parts of the app.
- **Custom Items for Grocery List**: Allow users to add custom items to the grocery list.
- **User Profile Page for Preferences**: Add a profile page where users can store preferences (e.g., theme).
- **Add Icons to Menu Items**: Add icons to menu items (e.g., dishes, ingredients) for better navigation.
- **Explore Layout Options**: Experiment with layout styles for improved UI/UX and responsiveness.
- **Add Delicious and Difficulty Ratings**: Implement ratings for meal items (deliciousness and difficulty).
- **Admin Screen for Meal Recommendation Logic**: Create an admin screen with sliders to adjust meal recommendations.
- **Protect Against XSS (Cross-Site Scripting)**: Implement measures to prevent Cross-Site Scripting vulnerabilities.
- **On the Grocery List page, combine quantity and unit**: Instead of "Chicken, 2, Lbs," display it as "Chicken, 2 Lbs."
- **On the Upcoming Menu page, replace the dropdown list to select a meal with a grid of buttons**: Display a grid of buttons (no more than 5 or 6 wide), one for each menu item, with meal photos on the button and remove the dropdown menu

---

## 👨‍💻 Author

**Hiroshi Thomas**  
📍 Gulf Coast, Florida  
🎮 Streaming & dev at [@iCyberia](https://github.com/iCyberia)  
🐧 Loves Debian, homelabs, and anti-malware

---

## 📜 License

MIT License. Use freely and contribute back!
