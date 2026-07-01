# Deployment Guide (Free Hosting)

To complete the internship assignment, you need to host your app online. Follow these 3 simple steps to deploy your backend to **Render**, database to **MongoDB Atlas**, and frontend to **Vercel** for free.

---

## Step 1: Get a Free MongoDB Atlas Database

1. Sign up for a free account at [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database).
2. Create a new **Shared Cluster** (which is 100% free).
3. In the security settings:
   - Create a database user (remember the username and password).
   - Set the IP Access List to `0.0.0.0/0` (allows connection from Render).
4. Click **Connect** -> **Drivers** and copy your **connection string** (it looks like `mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/?retryWrites=true&w=majority`).
5. Replace `<username>` and `<password>` in that connection string with your actual credentials.

---

## Step 2: Deploy Backend to Render

1. Push your code to GitHub.
2. Sign in to [Render](https://render.com/) using your GitHub account.
3. Click **New** -> **Web Service**.
4. Connect your GitHub repository.
5. Configure the Web Service settings:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Under **Environment Variables**, add:
   - `MONGO_URI` = *(paste your connection string from Step 1)*
   - `PORT` = `5000`
7. Click **Deploy Web Service**. Render will build and deploy your backend.
8. Once active, copy the Render URL (e.g. `https://your-backend.onrender.com`).

---

## Step 3: Deploy Frontend to Vercel

1. Sign in to [Vercel](https://vercel.com/) with GitHub.
2. Click **Add New** -> **Project**.
3. Import your GitHub repository.
4. Configure settings:
   - **Framework Preset**: Vite
   - **Root Directory**: `frontend`
5. Under **Environment Variables**, add:
   - `VITE_API_URL` = `https://your-backend.onrender.com/api/tasks` *(replace with your Render URL from Step 2)*
6. Click **Deploy**. Vercel will deploy your frontend.
7. Once deployed, Vercel will give you a public URL (e.g. `https://your-app.vercel.app`).
