import { db } from '../../lib/firebase-admin'
export default async function handler(req, res) {

  try {
    const snapshot = await db.collection("goat").doc("goatvote").get()

    res.status(200).json(snapshot?.data())
  }
  catch (err) {
    res.status(500).json({err})
  }
}
