import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="flex justify-center flex-col text-white h-[44vh] items-center px-5 md:px-0 text-xs md:text-base">
        <div className="font-bold py-2 flex justify-center items-center text-3xl md:text-5xl">Get me a chai <span><Image src="/tea.gif" width={88} height={88} alt="image of tea" unoptimized/></span></div>
        <p className="text-center">A Crowdfunding Platform. Get funding by your fans and followers. Start now !</p>
        <div className="my-6">
          <Link href={"/login"}>
            <button className="text-white  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Start Here</button></Link>
          <Link href={"/about"}>
            <button className="text-white  bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Read More</button></Link>
        </div>
      </div>
      <div className="bg-white h-1 opacity-15">
      </div>
      <div className="text-white py-10 ">
        <h2 className="text-2xl font-bold text-center pb-12 ">Your fans can buy you a chai</h2>

        <div className="flex gap-5 justify-around">
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <Image className="bg-slate-500 rounded-full" src="/man.gif" width={88} height={88} alt="Image of a man"  unoptimized/>
            <p className="font-bold text-center">Fund Yourself</p>
            <p className="text-center">Get help from your fans</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <Image className="bg-slate-500 rounded-full" src="/coin.gif" width={88} height={88} alt="image of coin"  unoptimized/>
            <p className="font-bold text-center">Get Support</p>
            <p className="text-center">Get help from your fans</p>
          </div>
          <div className="item space-y-3 flex flex-col justify-center items-center">
            <Image className="bg-slate-500 rounded-full" src="/group.gif" width={88} height={88} alt="image of a group"  unoptimized/>
            <p className="font-bold text-center">Work with Groups</p>
            <p className="text-center">Get help from your fans</p>
          </div>
        </div>

      </div>
      <div className="bg-white h-1 opacity-15"></div>

      <div className="text-white py-10 flex flex-col justify-center items-center relative">
        <h2 className="text-2xl font-bold text-center mb-14 ">Learn More About us</h2>
        <div className="w-full max-w-5xl aspect-video  overflow-hidden px-5">
          <iframe
            className="w-full h-full rounded-[20px]"
            src="https://www.youtube.com/embed/QtaorVNAwbI?si=rU4GLUaifXZ-KWbt"
            title="YouTube video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

      </div>
    </>
  );
}
