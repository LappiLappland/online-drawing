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

## 🎥 Showcase videos

### General use

[general.webm](https://github.com/user-attachments/assets/46f1877c-90e3-4b06-bb69-be5f4179247e)

### Reconnection and high ping resolution

[reconnect.webm](https://github.com/user-attachments/assets/2b4c22bd-9f9a-4a03-a00f-6bb0d95dad8a)

---

## 🚀 Try it

👉 [Open offline mode only](https://lappilappland.github.io/online-drawing/) *(Fully functional without server)*

---

## 🛠️ Tech stack

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
