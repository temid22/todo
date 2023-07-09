import mongoose from 'mongoose';
// Create model to store data in the mongo db
const TasksSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model('Tasks', TasksSchema);
