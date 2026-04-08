import React from "react";
import { Helmet } from "react-helmet";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>

      <div className="pt-20 pb-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400 mb-4 block">
              Our Philosophy
            </span>
            <h1 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">
              We exist to create{" "}
              <span className="italic text-zinc-400">meaningful</span> objects
              for a simpler life.
            </h1>
            <p className="text-xl text-zinc-600 leading-relaxed">
              Founded in 2020, Luxe was born out of a desire for better
              essentials. We tired of the fast-fashion cycle and decided to
              build something that lasts.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
            <div className="aspect-8/9 bg-zinc-100 overflow-hidden">
              <img
                src="https://picsum.photos/seed/studio/800/1000"
                alt="Our Studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <h2 className="text-3xl font-serif mb-6">
                Quality over Quantity
              </h2>
              <p className="text-zinc-600 mb-6 leading-relaxed">
                Every piece in our collection is the result of months of design
                and testing. We partner with small, family-owned factories that
                share our commitment to ethical production and fair wages.
              </p>
              <p className="text-zinc-600 leading-relaxed">
                We use only the finest materials—organic cotton,
                vegetable-tanned leather, and recycled metals—to ensure that
                your Luxe pieces only get better with age.
              </p>
            </div>
          </div>

          <div className="bg-zinc-50 p-12 md:p-24 text-center max-w-7xl mx-auto">
            <h2 className="text-3xl font-serif mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-widest">
                  Transparency
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  We share our process, our pricing, and our factories with you.
                  No secrets.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-widest">
                  Sustainability
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  We strive to minimize our environmental footprint at every
                  stage of production.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-4 uppercase text-xs tracking-widest">
                  Community
                </h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  We believe in building lasting relationships with our
                  customers and partners.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
