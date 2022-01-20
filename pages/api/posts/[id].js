import { connectToDatabase } from "../../../util/mongodb";
import { ObjectId } from "mongodb";

export default async function Delete(req, res) {
  const {
    method,
    query: { id },
  } = req;
  const { db } = await connectToDatabase();

  if (method === "DELETE") {
    try {
      await db.collection("posts").deleteOne({ _id: new ObjectId(id) });
      res.status(200).json({ message: "The post has been deleted!!" });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}
