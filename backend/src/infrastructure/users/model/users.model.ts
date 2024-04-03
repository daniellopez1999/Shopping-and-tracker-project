import mongoose from 'mongoose';
import 'dotenv/config';

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(`${process.env.DB_URL}`);
}

const UsersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', UsersSchema);

export default User;
