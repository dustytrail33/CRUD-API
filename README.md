This is a simple REST API application built with Node.js that implements:

- Basic CRUD operations for user management  
- Clustering support (round-robin load balancing)  
- In-memory data storage  

---

## 📦 Installation

1. **Clone the repository**  
   ```bash
   git clone https://github.com/dustytrail33/CRUD-API.git
   cd CRUD-API
   ```

2. **Install dependencies**  
   ```bash
   npm install
   ```

---

## ⚙️ Configuration

Environment variables:
- `PORT` - Main application port (default: 3000)
- `DB_PORT` - Database port in cluster mode (default: 5000)


## 🚀 Available Scripts

### Development server
```bash
npm run start:dev
```
Starts the DB server with `nodemon src/dbServer.ts`, auto-restarts on file changes.

### Production build & run
```bash
npm run start:prod
```
Lints, tests, bundles with Webpack, then runs `node dist/dbServer.js`.

### Cluster mode
```bash
npm run start:multi
```
Builds the project, launches the in-memory DB on port 5000, then starts the load balancer (on PORT) and worker cluster processes.

### Build only
```bash
npm run build
```
Runs lint, tests, and Webpack production build.

### Lint code
```bash
npm run lint
```

### Format code
```bash
npm run format
```

### Run tests
```bash
npm test
```

---

## 🧪 Testing

All unit tests are written in Jest and mock the in-memory database. To run them:

```bash
npm test
```
