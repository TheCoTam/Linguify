import Image from 'next/image';
import Link from 'next/link';

function Footer() {
  return (
    <div className="flex flex-col justify-center items-center bg-slate-900 h-max w-[100%] pt-10 pb-5 text-white">
      <div className="flex flex-col xs:flex-row w-[95%]  lg:w-[80%] mb-2 justify-between items-center gap-10">
        <div className="text-3xl uppercase">Linguify</div>
        <div className="flex flex-row gap-10">
          <Link href="/">Home</Link>
          <div>About</div>
          <div>Licenses</div>
        </div>
      </div>
      <hr className="w-[95%] lg:w-[80%] my-8" />
      <div className="flex flex-col lg:flex-row items-center w-[80%] justify-between gap-6">
        <div>
          <div>
            Copyright © Thế Anh | Designed by Thế Anh - Powered by Thế
            Anh
          </div>
        </div>
        <div className="flex flex-row gap-5">
          <div className="flex w-6 h-6 bg-white rounded-full justify-center items-center shadow-xl cursor-pointer">
            <Image
              src="/icons/facebookIcon.svg"
              width={25}
              height={25}
              alt="facebook"
            />
          </div>
          <div className="flex w-6 h-6 bg-white rounded-full justify-center items-center shadow-xl cursor-pointer">
            <Image
              src="/icons/youtubeIcon.svg"
              width={25}
              height={25}
              alt="facebook"
            />
          </div>
          <div className="flex w-6 h-6 bg-white rounded-full justify-center items-center shadow-xl cursor-pointer">
            <Image
              src="/icons/linkedInIcon.svg"
              width={25}
              height={25}
              alt="facebook"
            />
          </div>
          <div className="flex w-6 h-6 bg-white rounded-full justify-center items-center shadow-xl cursor-pointer">
            <Image
              src="/icons/XIcon.svg"
              width={18}
              height={18}
              alt="facebook"
            />
          </div>
          <div className="flex w-6 h-6 bg-white rounded-full justify-center items-center shadow-xl cursor-pointer">
            <Image
              src="/icons/instagramIcon.svg"
              width={25}
              height={25}
              alt="facebook"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
