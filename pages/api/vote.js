import { admin, db } from '../../lib/firebase-admin'
export default async function handler(req, res) {

    try {
    const { vote } = req?.body

    await db.collection("goat").doc("goatvote").update({[`${vote}.votes`]: admin.firestore.FieldValue.increment(1)
})
    
    res.status(200).json({ message: "Vote submitted"})
  }
  catch (err) {
    res.status(500).json({err})
  }
}


