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

## 💡 Future Ideas

- [ ] User authentication
- [ ] Recipe photos and favorites
- [ ] Ingredient database with units
- [ ] Export grocery list to PDF or app

---

## 👨‍💻 Author

**Hiroshi Thomas**  
📍 Gulf Coast, Florida  
🎮 Streaming & dev at [@iCyberia](https://github.com/iCyberia)  
🐧 Loves Debian, homelabs, and anti-malware

---

## 📜 License

MIT License. Use freely and contribute back!
