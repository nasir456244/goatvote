import { admin, db } from '../../lib/firebase-admin'
export default async function handler(req, res) {

    try {
      if(req.method !== "POST") {
        res.status(405).json({message: "Wrong method"})
        return
      }
      const { vote } = req?.body
      if(!vote || vote === "") {
        res.status(400).json({message: "you need to provide who you are voting for"})
        return

      }
      await db.collection("goat").doc("goatvote").update({[`${vote}.votes`]: admin.firestore.FieldValue.increment(1)
      })
    res.status(200).json({ message: "Vote submitted"})
    
  }
  catch (err) {
    res.status(500).json({err})
  }
}


