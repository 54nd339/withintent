'use client';

import React from 'react';
import { motion, useScroll } from 'framer-motion';
import { useParallax } from '@/app/hooks';

export function HeroSection() {
  const { scrollY } = useScroll();
  const y = useParallax(scrollY, 300);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-neutral-900">
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/20 z-10" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 z-10" />
        <motion.img
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: 'easeOut' }}
          src="https://scontent.cdninstagram.com/v/t51.82787-15/588634385_17845713507616862_7373357844874984663_n.jpg?stp=dst-jpg_e35_tt6&_nc_cat=102&ig_cache_key=Mzc3NzQ2MjM3Mzc1MzgxOTE4MA%3D%3D.3-ccb7-5&ccb=7-5&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyMDB4MTUwMC5zZHIuQzMifQ%3D%3D&_nc_ohc=owVsicPWVKkQ7kNvwGBeN2G&_nc_oc=AdkB4l3rqBKkItpF-jSl5oij-JSjg0YFb2ky86sJ_Wv5DGw2kD_pyXwEb_Z_BB-vKVux7tl5ZjvVwUTkodVxEVIx&_nc_ad=z-m&_nc_cid=1174&_nc_zt=23&_nc_ht=scontent.cdninstagram.com&_nc_gid=mHuIcG37B9cOMpmuT9JkQw&oh=00_Afky8UTgCAb--VtG5U_lA-nv7jIpCLAioKFbADABjms0Gw&oe=6944E50B"
          alt="Luxury Jewelry"
          className="w-full h-full object-cover opacity-90"
        />
      </motion.div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 w-full mt-10">
        <div className="overflow-hidden mb-2">
          <motion.h1
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
            className="font-serif text-[15vw] md:text-[12vw] leading-[0.85] text-white/90 tracking-tighter mix-blend-overlay"
          >
            WITH INTENT
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-6 md:gap-12 mt-4 md:mt-8"
        >
          <p className="font-sans text-[10px] md:text-sm text-white/80 tracking-[0.4em] uppercase">Curated Vintage</p>
          <div className="w-12 h-[1px] bg-white/40 hidden md:block" />
          <p className="font-sans text-[10px] md:text-sm text-white/80 tracking-[0.4em] uppercase">Est. 2024</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="font-sans text-[10px] text-white/50 tracking-[0.2em] uppercase">Explore</span>
          <div className="w-[1px] h-16 bg-white/10 relative overflow-hidden">
            <motion.div
              animate={{ y: ['-100%', '100%'] }}
              transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
              className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-transparent via-white to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
