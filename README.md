# 🌟 **BetterME** 🌟  

Welcome to **BetterME** – your ultimate personal growth companion! 🚀  
I built this project to **track my daily expenses, junk food habits, tasks, journal entries**, and everything in between. 📝💰🍔  

With **BetterME**, I stay in control of my life, build better habits, and grow every single day! 🌱✨  

 💡 *"Your future is created by what you do today, not tomorrow."* – **Take the first step with BetterME!** 🏆  


--
# 🛠️ **Tech Stack**


### 🌐 **Frontend**  
- ⚡ **Next.js** – The powerful React framework for modern web apps.  
- 🎨 **Tailwind CSS** – Effortless, responsive designs with utility-first CSS.  
- 🛋️ **ShadCN UI** – Sleek, customizable components.  
- 🖥️ **TypeScript** – Type-safe code for a robust development experience.  
- 🔐 **Clerk Auth** – Hassle-free authentication integration.  

 **🌟 Deployed on [Vercel](https://vercel.com) 🚀**  

---

### 🔧 **Backend**  
- 🚀 **Express.js** – The lightweight Node.js web application framework.  
- 🗂️ **Mongoose** – Simplified MongoDB interactions for scalable data models.  
- 🧠 **Llama-3 AI Integration** – Intelligent AI-powered features with Llama-3.  

 **🌍 Deployed on [Render](https://render.com) 🌟**  

---

### 💡 **Why this stack?**  
- 🌈 **Frontend**: Lightning-fast deployment, modern UI, and seamless user experience.  
- 🔥 **Backend**: Scalable, feature-packed, and smart integration for real-world solutions.  

---


---

## ✨ **Features**  
- 💸 **Track Daily Expenses**  
- 🍕 **Monitor Junk Food Consumption**  
- ✅ **Manage Tasks and To-Do Lists**  
- 📔 **Write and View Journal Entries**  
- 📊 **Gain Insights into Your Habits**  

---

## 📦 **How to Install and Run the Project** 🚀  

# Step 1: Clone the Repository  
```bash  
git clone https://github.com/StarDust130/BetterME.git  
cd BetterME
```

# Step 2: Set Up Environment Variables  
#### Create a .env file in both client and server directories with these keys:  
### For Client 
```bash  
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=***
CLERK_SECRET_KEY=***
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FORCE_REDIRECT_URL=/home
NEXT_PUBLIC_CLERK_SIGN_UP_FORCE_REDIRECT_URL=/home
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/home
NEXT_PUBLIC_SERVER_URL="http://localhost:5000/api/v1/dayTask"
NEXT_PUBLIC_HABITS_SERVER_URL="http://localhost:5000/api/v1/habits"
NEXT_PUBLIC_STATS_SERVER_URL="http://localhost:5000//api/v1/stats"
``` 
### For Server   
```bash  
MONGODB_URL = ***
PORT=5000
CLIENT_URL="http://localhost:3000"
LLAMA_API_KEY=***
```

# Step 3: Install Dependencies  
### Frontend  
```bash  
cd client  
npm install
```
### Backend  
```bash  
cd server  
npm install
```
# Step 4: Start the Project   
### Frontend  
```bash  
cd client  
npm run dev
```
### Backend  
```bash  
cd server  
npm run dev
```
---
  🎯 BetterME is not just an app – it's your personal guide to becoming the best version of yourself!

 ✨ Made with ❤️ by [Chandrashekhar](https://github.com/StarDust130) 💻  
