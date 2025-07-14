import express from 'express';
import mongoose from 'mongoose';
import bookmarkRoutes from './routes/bookmarks.js'; // make sure you add `.js` extension

const app = express();
app.use(express.json());

// Route middleware
app.use('/api/bookmarks', bookmarkRoutes);

// MongoDB connection
mongoose.connect('your-atlas-connection-string-here', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch(err => console.error("❌ MongoDB error:", err));

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});