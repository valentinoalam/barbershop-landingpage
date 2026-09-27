export interface Hairstyle {
  id: string;
  name: string;
  category: string;
  difficulty: string;
  image: string;
  folder: string;
  description: string;
  gallery: string[];
}

export const hairstyles: Hairstyle[] = [
  {
    "id": "1",
    "name": "Modern Textured Quiff",
    "category": "Short",
    "difficulty": "Medium",
    "image": "/img/hairstyles/quiff-style.jpg",
    "folder": "quiff",
    "description": "A contemporary take on the classic quiff with textured layers and modern styling techniques.",
    "gallery": [
      "/img/hairstyles/quiff/0a339e0fbbae1adbb7257893e4d7c99a_hbtu03.jpg",
      "/img/hairstyles/quiff/1-disheveled-quiff-hairstyle-1_nyzzev.webp",
      "/img/hairstyles/quiff/11-edgy-quiff-hairstyle-1_co3kp6.webp",
      "/img/hairstyles/quiff/13-edgy-faded-quiff-haircut_ichdl0.webp",
      "/img/hairstyles/quiff/14-tapered-side-part-quiff-haircut_vrxhwd.webp",
      "/img/hairstyles/quiff/15-layered-quiff-haircut-1_utm4x7.webp",
      "/img/hairstyles/quiff/16-quiff-haircut-with-faded-sides_l9wzfs.webp",
      "/img/hairstyles/quiff/17-long-top-short-sides-quiff-hairstyle-for-men-2_ekgni9.webp",
      "/img/hairstyles/quiff/18-quiff-haircut-for-thick-hair-1_bjm48r.webp",
      "/img/hairstyles/quiff/18-quiff-haircut-for-thick-hair_jpwgou.webp",
      "/img/hairstyles/quiff/19-short-faded-quiff-haircut_yx1hsd.webp",
      "/img/hairstyles/quiff/20-edgy-quiff-with-mid-fade-1_stq3hw.webp",
      "/img/hairstyles/quiff/3-edgy-quiff-haircut-1_odzktl.webp",
      "/img/hairstyles/quiff/4edb4dee5d8f8389ad2ff4bae1387032_xwuxkt.jpg",
      "/img/hairstyles/quiff/5-tapered-quiff-haircut-for-guys_z9g9az.webp",
      "/img/hairstyles/quiff/51b9318cb15dfbd6d31e72d2c97aa98e_qzeuog.jpg",
      "/img/hairstyles/quiff/6-long-top-quiff-haircut-for-men-1_bdz7uy.webp",
      "/img/hairstyles/quiff/65d7e1a980dba21b9697e0eb6dcc8b85_rb1z07.jpg",
      "/img/hairstyles/quiff/7-upswept-quiff-hairstyle-1_njqcsr.webp",
      "/img/hairstyles/quiff/7ac0cc8a7309633d1b285ae3b138e3c4_yblyhh.jpg",
      "/img/hairstyles/quiff/8-quiff-haircut-with-short-sides-1_ycadmu.webp",
      "/img/hairstyles/quiff/8b936e8f7fcfe98de6ecbe73f359ae59_uwe7de.jpg",
      "/img/hairstyles/quiff/9-sideswept-quiff-hairstyle-1_z8ztc1.webp"
    ]
  },
  {
    "id": "2",
    "name": "Classic Pompadour",
    "category": "Medium",
    "difficulty": "Hard",
    "image": "/img/hairstyles/pompadour-style.jpg",
    "folder": "pompad",
    "description": "Timeless vintage style with volume and height, perfect for formal occasions and retro looks.",
    "gallery": [
      "/img/hairstyles/pompad/12-high-pompadour-hairstyle-for-guys-1_huap85.webp",
      "/img/hairstyles/pompad/2-pompadour-hairstyle-for-men-1_kvjtsx.webp",
      "/img/hairstyles/pompad/Undercut-Haircut14-Pompadour-Undercut_nng4j7.webp"
    ]
  },
  {
    "id": "3",
    "name": "Skin Fade",
    "category": "Short",
    "difficulty": "Easy",
    "image": "/img/hairstyles/fade-style.jpg",
    "folder": "fade",
    "description": "Clean, professional cut with gradual fading from skin to longer hair on top.",
    "gallery": [
      "/img/hairstyles/fade/12-mens-fauxhawk-haircut-with-faded-sides_fhg0q5.webp",
      "/img/hairstyles/fade/6-Asian-taper-fade_dfolos.webp",
      "/img/hairstyles/fade/Big-Comb-Over-Mid-Fade-Long-Beard_wnvkvb.webp",
      "/img/hairstyles/fade/Comb-Over-Fade-Haircut_ul5nb1.webp",
      "/img/hairstyles/fade/Comb-Over-Fade-Hard-Part_tfmda2.webp",
      "/img/hairstyles/fade/High-Fade-Comb-Over_i0atli.webp",
      "/img/hairstyles/fade/long-on-top-drop-fade-500x500_nbg5bq.webp",
      "/img/hairstyles/fade/mid-fade_cgbwov.webp",
      "/img/hairstyles/fade/Straight-Hair-Fringe-Fade-Hairstyle-Men_ndzsre.webp"
    ]
  },
  {
    "id": "4",
    "name": "Military Buzz Cut",
    "category": "Short",
    "difficulty": "Easy",
    "image": "/img/hairstyles/buzz-cut-style.jpg",
    "folder": "buzz",
    "description": "Ultra-short, low-maintenance style perfect for active lifestyles and hot weather.",
    "gallery": [
      "/img/hairstyles/buzz/21-Slicked-Back-Looped-Man-Bun-with-Buzzed-Texture_lx69ne.webp",
      "/img/hairstyles/buzz/25-Slicked-Back-Flip-Man-Bun-with-Short-Buzz_wi8ebf.webp",
      "/img/hairstyles/buzz/26-Slicked-Back-Man-Bun-with-Smooth-Buzzed-Sides_bj0qez.webp",
      "/img/hairstyles/buzz/disconnected-buzz-cut_h4l4w0.webp",
      "/img/hairstyles/buzz/induction-buzz-cut_k1qujg.webp",
      "/img/hairstyles/buzz/tapered-buzz-cut_gpigli.webp",
      "/img/hairstyles/buzz/TEXTURED-BUZZ-CUT_mxizq7.webp",
      "/img/hairstyles/buzz/uniform-buzz-cut_geidym.webp"
    ]
  },
  {
    "id": "5",
    "name": "Slicked Back",
    "category": "Medium",
    "difficulty": "Medium",
    "image": "/img/hairstyles/slicked-back-style.jpg",
    "folder": "slicked",
    "description": "Sophisticated business style with hair combed straight back using styling products.",
    "gallery": [
      "/img/hairstyles/slicked/Brushed-Back-Hairstyle-with-Full-Beard-600x600_uqrrlx_wdhnqm.webp"
    ]
  },
  {
    "id": "6",
    "name": "Disconnected Undercut",
    "category": "Long",
    "difficulty": "Hard",
    "image": "/img/hairstyles/undercut-style.jpg",
    "folder": "undercut",
    "description": "Edgy style with shaved sides and long top section, creating a bold contrast.",
    "gallery": [
      "/img/hairstyles/undercut/1-mens-undercut-for-curly-hair_bjrc2f.webp",
      "/img/hairstyles/undercut/12-Textured-Man-Bun-with-Double-Slash-Undercut_jw6xce.webp",
      "/img/hairstyles/undercut/15-undercut-for-salt-and-pepper-hair_snc5xf.webp",
      "/img/hairstyles/undercut/4-long-top-undercut-for-guys_syvhw4.webp",
      "/img/hairstyles/undercut/5-slicked-back-undercut-hairstyle_adkcfd.webp",
      "/img/hairstyles/undercut/7-short-textured-undercut_afryfq.webp",
      "/img/hairstyles/undercut/8-upswept-undercut-hairstyle_ebpwbs.webp",
      "/img/hairstyles/undercut/Brush-Up-Undercut-e1536734687290_db752e.webp",
      "/img/hairstyles/undercut/Man-Bun-Undercut_fpx5ho.webp",
      "/img/hairstyles/undercut/Slicked-Back-Undercut-Design-with-Fade-and-Lines-for-Guys-480x600_i7wnzd.webp",
      "/img/hairstyles/undercut/Textured-French-Crop-with-Undercut-e1536731910829_dvvmro.webp",
      "/img/hairstyles/undercut/Undercut-Haircut1-Disconnected-Undercut-Side-Swept_rqvtu3.webp",
      "/img/hairstyles/undercut/Undercut-Haircut13-Classic-Undercut_qrjdx5.webp",
      "/img/hairstyles/undercut/Undercut-Haircut3-Loose-Curly-Long-Undercut_nuzwyd.webp",
      "/img/hairstyles/undercut/Undercut-Quiff-Haircut-with-Skin-Fade-and-Mirror-Lines-545x600_yrcc0q.webp"
    ]
  },
  {
    "id": "7",
    "name": "Caesar Cut",
    "category": "Short",
    "difficulty": "Medium",
    "image": "/img/hairstyles/caesar/Caesar-with-Tapered-Sideburns-500x615_ztxsxy.jpg",
    "folder": "caesar",
    "description": "Edgy style with shaved sides and long top section, creating a caesar look.",
    "gallery": [
      "/img/hairstyles/caesar/Caesar-Blonde-Haircut-500x667_ktki8a.webp",
      "/img/hairstyles/caesar/Caesar-Cut-Glasses-500x667_vznfqj.webp",
      "/img/hairstyles/caesar/Caesar-Style-with-Texture-e1534751727252-500x619_ry34zm.webp",
      "/img/hairstyles/caesar/Caesar-with-Tapered-Sideburns-500x615_ztxsxy.webp",
      "/img/hairstyles/caesar/Casual-Caesar-with-Almost-Buzz-Cut-500x798_dq8l3x.webp",
      "/img/hairstyles/caesar/High-Faded-French-Cropped-Caesar-Style-500x722_aiq2tv.webp",
      "/img/hairstyles/caesar/Low-Maintainence-Caesar-Cut-500x741_jf0ko9.webp",
      "/img/hairstyles/caesar/Messy-Caesar-500x667_eposep.webp",
      "/img/hairstyles/caesar/Modern-Caesar-500x782_y5kevb.webp",
      "/img/hairstyles/caesar/The-Blend-of-Buzz-Cut-and-Caesar-Cut-500x699_ig39sk.webp"
    ]
  },
  {
    "id": "8",
    "name": "French Crop",
    "category": "Medium",
    "difficulty": "Medium",
    "image": "/img/hairstyles/french-crop/French-Crop-Haircut-480x600_jjctfh_amlcnd.jpg",
    "folder": "french-crop",
    "description": "Edgy style with shaved sides and medium top section, creating a bold contrast.",
    "gallery": [
      "/img/hairstyles/french-crop/1-French-Crop-Fade_zrgdbs.webp",
      "/img/hairstyles/french-crop/3-Textured-French-Crop_yf74d0.webp",
      "/img/hairstyles/french-crop/Choppy-French-Crop_le71jv.webp",
      "/img/hairstyles/french-crop/Color-Disconnected-French__vjio49.webp",
      "/img/hairstyles/french-crop/Dyed-French-Crop-and-High-Fade-Yes-Please_fhovnd.webp",
      "/img/hairstyles/french-crop/French-Crop-5_jgggvy.webp",
      "/img/hairstyles/french-crop/French-Crop-Haircut-480x600_jjctfh_amlcnd.webp",
      "/img/hairstyles/french-crop/French-Crop-with-Coarse-Hair_hfjlqr.webp",
      "/img/hairstyles/french-crop/French-Crop-with-Sleek-Drop-Fade-e1566290155316_s4yxk4.webp",
      "/img/hairstyles/french-crop/Fresh-and-Short-French-Crop_vsvzim.webp",
      "/img/hairstyles/french-crop/Long-Fringe-French-Crop__odrxzp.webp",
      "/img/hairstyles/french-crop/Manicured-Long-Beard-and-French-Crop_wlmmms.webp",
      "/img/hairstyles/french-crop/Modern-French-Crop-with-Fade-e1536917037928_itgytx.webp",
      "/img/hairstyles/french-crop/Simple-French-Crop-with-Messy-Top_r8rird.webp",
      "/img/hairstyles/french-crop/Skin-faded-french-crop-3_rrc0ut.webp",
      "/img/hairstyles/french-crop/Touseled-French-Crop-with-Short-Line-Ups_gnl4zs.webp"
    ]
  }
];

export const categories = [
  "All",
  "Short",
  "Medium",
  "Long"
];
export const difficulties = [
  "Easy",
  "Medium",
  "Hard"
];
