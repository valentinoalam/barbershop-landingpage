import React from 'react';
import GalleryImage from '../cards/gallery-img'; // Adjust path as needed

function Gallery() {
  const images = [
    "https://lh3.googleusercontent.com/aida-public/AB6AXuClC_cU0Xwv6WX5u-JX-aW9n5W4datMPsXp3al8xOu0COcYmMhVSx51afaPDNpo801lIV2AFWfAwDOv_JLCmmnaDSh57KYmbSrhBfoZHzJojL698cZNoQu4vdiUUhTwEnuRTjX31M8KSIpllPxYMT5xB9VZ8tF7n94n49c7hRWulmR-P3f8jUIP1Jj5SD_aq5hxSKJbnbX8a_IsVNwy9bw2JsAsOAFzTAJMP6YXIOB3SU-4jxTGC-W5oRkp8wgokv08ox7f2Efv3DA",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCYce9PosaP4oGDDZ7slidiRbhFgC1MQqL1k2Giom32WTO0Xe6BMeykzg_zjpwOG-Am8X3OBhbMmXr7uW6ilOd7qIRrWKlWY3Q0ZwmC1eeTlRs_mqpmxLAy90i0ufc0zB9z26-Y9colcWZlEszSL1E6vY_jt7ax13Fvg-y4kISPjQRWUysNHbV_wTtvmaEnRsMuvqTz5n-92RYlb-53ojLNMJbTeAzEMZzcgOreP4UAEEJ00v6UwMefJxZrVm2XXB9Vtwy-88ZoslM",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuDTtz4zMHA8A-dT_z5MFAKSZrU5YZsPT6_BA4DKNvNS4Rqvou2q7KLV5KkyJseBoklF-yj7q_fca42SbpoCPlCgAIHDzbVOMGo2JLBHVORn8esZDrrNmUofq5dzGMLoLCGDiacz0AYJkKq79EkCT2e_Q9xAC7SBo3qMOcGRUr87PES8ELjjCui-CadUEnCUHiprgjYUfMkHaLVa2_8JzKQKiQR1sZsAVjhMNePdoEKeCSy504YG4zehBpdpYr-kroZYL53gwSxEaRE",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuB-_87nM9sMtzPMaMsGvdl5AYF0oI9lpt8uWezjQLrXsG-GsrlfxW04wp3Xj7bhBcT4CWSIARqc9xzw6BhhowCvclZJ9XPvjsrnyi2YLbKRZDwuxNEVV5aAGyqEzl6a7lnWiLl5DoGsL4aIRHW2UENuOQJs7Az81eSJ_hrVDX5uFwVG1RacgCctn0-4eCooSzUZw8EGmF1uMB-SsiT44CrAVnmL6WvVmbtF6BVah1VXx15AD0IOeu18cQq5-KAOgzhTb-9pBAOu0j8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCmobdkpt1wC6DHh0e21W9v4JKBWuZ84a_RKIjZP1C-QfKPaPbRhd2KGMi5c-FC_l97Yih9sZT3IPrg-n8Fh-Oa2w8P3Uha5PvtJ1Caf6Naf5tPKu5vMD7MlmSxuHqrAjyd4hkKQHS8IvmXTAwEA36v3PwksGkBy8zKbcaVXY4eiOjFcPZy2IoCOoCZgKXl6bhaGLO3gfvVINhOpjA9PtDGl7XTliIusSkNDslM0W1d12h_4_2GqscuafBkf7CE-Wa0iiJF4uOP-M8",
    "https://lh3.googleusercontent.com/aida-public/AB6AXuCUvSOT6HwNlQKVRMBfRap9ROGcPpveR4zyyjY-jGouf9blPRR9trf1gs8_9TCP4Z1tUXFFFNlbyx7NHdWx2enIlQU6j3jD1JihhFX2gXShNsZ2mYad4WM4X-6hHauRaHAR1cEJ8mJhQbOjgdPGwu4nOn6h74csjxZmMlihxOi5vNUgBhHzeMAhC4MXO7Ozqt2GloM2RyuJE-vE7XR65z3N_LdsQ5S-In4T5eBSAFuJ8ZESG6HLvOQQu1EPuBn1sopmqjgSIVS71cw",
  ];

  return (
    <>
      <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Gallery</h2>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {images.map((imageUrl, index) => (
          <GalleryImage key={index} imageUrl={imageUrl} />
        ))}
      </div>
    </>
  );
}

export default Gallery;