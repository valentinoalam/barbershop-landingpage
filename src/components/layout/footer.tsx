import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <footer className="flex relative justify-center">
      <div className='absolute w-full grayscale-80 h-full'>
        <Image className='absolute z-0 object-cover' fill src="/img/abstract-geometric-shapes.png" alt='' />
        <div className='absolute inset-0 bg-gradient-to-b z-0 from-slate-900 to-transparent'></div>
      </div>
      
      <div className="flex max-w-[960px] z-10 flex-1 flex-col">
        <footer className="flex flex-col gap-6 px-5 py-10 text-center @container">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#">
              <div className="text-[#bab29c]" data-icon="InstagramLogo" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32-32A32,32,0,0,1,128,160ZM176,24H80A56.06,56.06,0,0,0,24,80v96a56.06,56.06,0,0,0,56,56h96a56.06,56.06,0,0,0,56-56V80A56.06,56.06,0,0,0,176,24Zm40,152a40,40,0,0,1-40,40H80a40,40,0,0,1-40-40V80A40,40,0,0,1,80,40h96a40,40,0,0,1,40,40ZM192,76a12,12,0,1,1-12-12A12,12,0,0,1,192,76Z"
                  ></path>
                </svg>
              </div>
            </Link>
            <Link href="#">
              <div className="text-[#bab29c]" data-icon="FacebookLogo" data-size="24px" data-weight="regular">
                <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                  <path
                    d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"
                  ></path>
                </svg>
              </div>
            </Link>
          </div>
          <p className="text-[#bab29c] text-base font-normal leading-normal">© 2024 The HairCut. All rights reserved.</p>
        </footer>
      </div>
    </footer>
  )
}

export default Footer