import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react'
import mj from '../public/mj.png'
import lbj from '../public/lbj.webp'

export default function Home({data}) {

  const [votes, setVotes] = useState(data)

  const totalVotes = votes?.lbj?.votes + votes?.mj?.votes

  const PostVote = async (vote) => {
    const response = await fetch("http://localhost:3000/api/vote", {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ vote })
    });
    const res = await response.json();
    return res;
  }


  const handleSubmitVote = async (type) => {
    const hasVotedMj = localStorage.getItem("mj");
    const hasVotedLbj = localStorage.getItem("lbj");
    if(hasVotedMj || hasVotedLbj)  return;

    if(type === "lbj") {
      localStorage.setItem("lbj", "Goat");
      const response = await PostVote(type)
      alert(response.message)
      setVotes((prev) => ({...prev, lbj : {...prev?.lbj, votes: prev?.lbj?.votes + 1}}))
    }
    if(type === "mj") {
      localStorage.setItem("mj", "Goat");
      const response = await PostVote(type)
      alert(response.message)
      setVotes((prev) => ({...prev, mj : {...prev?.mj, votes: prev?.mj?.votes + 1}}))
    }
    return
  }

  return (
    <div className='flex h-[100vh] w-[100vw] items-center justify-around gap-5'>
      <Head>
        <title>Goat Vote</title>
        <meta name="description" content="Michael Jordan & Lebron James Goat Vote" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>


      <p className='text-white text-center text-xl font-semibold'>{votes?.mj?.votes > 0 && (votes?.mj?.votes / totalVotes * 100).toFixed(2) + "%"} </p>
        <div className='bg-white max-w-[300px] max-h-[300px] '>
          <Image src={mj} />
          <button onClick={() => handleSubmitVote("mj")} className=' bg-[#CE1141] hover:bg-[#000] text-white text-xl font-bold py-4 w-[60%] justify-center flex mx-auto'>Goat</button>
        </div>
        <p className='text-white text-center text-xl font-semibold'>Michael Jordan</p>

      </div>


      <div>
        <p className='text-white text-center text-xl font-semibold'>{votes?.lbj?.votes > 0 && (votes?.lbj?.votes / totalVotes * 100).toFixed(2) + "%" } </p>
        <div className='bg-white max-w-[300px] max-h-[300px] flex flex-col'>
          <Image src={lbj} />
          <button onClick={() => handleSubmitVote("lbj")} className=' bg-[#FDB927] hover:bg-[#552583] text-black text-xl font-bold py-4 w-[60%] justify-center flex mx-auto'>Goat</button>
        </div>
        <p className='text-white text-center text-xl font-semibold'>Lebron James </p>
      </div>

      <div className='text-white fixed top-10 text-center  '>
        <h1 className='lg:text-[3rem] text-[2rem] font-bold'>Vote for the Goat</h1>
        <p className='font-semibold text-[1.5rem] text-blue'>Total Votes: {totalVotes}</p>
      </div>


      
    </div>
  )
}


export const getServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/getVotes");
  const data = await response.json()

  return {
    props: {
      data
    }
  }

}