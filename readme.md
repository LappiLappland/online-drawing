# 🎨 Online real-time drawing app

> A real-time online drawing application built with React, Deno, and WebSockets. Draw online or offline.


## 🌟 Features

- ✏️ **Freehand Drawing** – Draw with customizable stroke width, color, and tools
- 🌐 **Real-Time Collaboration** – Join or create rooms to draw with others using WebSockets
- 🔐 **Public & Private Rooms** – Choose whether your room appears in the public list or stays hidden
- 🔗 **Shareable Room Links** – Invite others with a simple URL
- 💬 **In-Room Chat** – Communicate while drawing
- 🔄 **Conflict-Free Sync** – Uses **CRDT (Conflict-Free Replicated Data Type)** for consistent drawing state across clients
- ♻️ **Seamless Reconnection** – High-latency and reconnection handled gracefully via **CRDTs** and **Socket.IO**

---

## 🎥 Showcase Videos

| Feature | Video |
|-------|-------|
| **General Use** | [![Watch General Demo](https://img.youtube.com/vi/YOUTUBE_ID_1/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_ID_1) |
| **Reconnection & CRDT Resolution** | [![Watch Reconnection Demo](https://img.youtube.com/vi/YOUTUBE_ID_2/0.jpg)](https://www.youtube.com/watch?v=YOUTUBE_ID_2) |

---

## 🚀 Try It Live

👉 [Open Offline Mode Only](https://your-app-link.com/offline) *(Fully functional without server)*

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React + Vite
- **Styling**: Tailwind CSS + shadcn/ui
- **Routing**: React Router (Framework Mode)
- **State Management**: Zustand
- **Data Fetching**: useSWR
- **Type Safety**: TypeScript
- **Realtime**: Socket.IO

### Backend
- **Runtime**: Deno
- **Framework**: Express
- **Validation**: Zod
- **Realtime**: Socket.IO
- **Architecture**: MVC (Model-View-Controller)
- **Type Safety**: TypeScript
