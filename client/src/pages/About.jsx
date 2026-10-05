import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { ArrowRight, Quote } from "lucide-react";

const stats = [
  { value: "2020", label: "Founded" },
  { value: "40+", label: "Artisan Partners" },
  { value: "12", label: "Countries Shipped" },
  { value: "98%", label: "Natural Materials" },
];

const timeline = [
  {
    year: "2020",
    title: "The First Stitch",
    desc: "Luxe began in a single rented workshop, with one tailor and a belief that less, made better, mattered more.",
  },
  {
    year: "2021",
    title: "Our First Collection",
    desc: "We launched our debut line of twelve essentials, each piece tested for six months before it ever reached a customer.",
  },
  {
    year: "2023",
    title: "Partnering with Artisans",
    desc: "We began working exclusively with small, family-run factories who shared our commitment to fair wages and craft.",
  },
  {
    year: "2026",
    title: "Where We Are Today",
    desc: "Shipping to twelve countries, still designing every piece the same way we did on day one — slowly, and on purpose.",
  },
];

const team = [
  {
    name: "Ava Lindqvist",
    role: "Founder & Creative Director",
    image: "https://picsum.photos/seed/ava/400/500",
  },
  {
    name: "Noah Berg",
    role: "Head of Production",
    image: "https://picsum.photos/seed/noah/400/500",
  },
  {
    name: "Mei Tanaka",
    role: "Lead Pattern Maker",
    image: "https://picsum.photos/seed/mei/400/500",
  },
];

const testimonials = [
  {
    quote:
      "I've had my Luxe tote for three years now. It looks better today than the day I bought it.",
    name: "Priya S.",
    detail: "Verified Customer",
  },
  {
    quote:
      "You can tell within the first ten minutes of wearing it that this was made by people who care about the details.",
    name: "Daniel K.",
    detail: "Verified Customer",
  },
  {
    quote:
      "Finally a brand that tells you exactly where and how a piece was made. No marketing fluff, just the facts.",
    name: "Harper L.",
    detail: "Verified Customer",
  },
];

const About = () => {
  return (
    <>
      <Helmet>
        <title>About</title>
      </Helmet>

      <div className="pt-20 pb-24 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero */}
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

          {/* Stats Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24 rounded-xl border border-zinc-100 shadow-sm bg-white p-8 md:p-10">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-serif text-zinc-900 mb-1">
                  {stat.value}
                </p>
                <p className="text-xs uppercase tracking-widest text-zinc-400 font-bold">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Quality over Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-24">
            <div className="aspect-8/9 bg-zinc-100 overflow-hidden rounded-xl">
              <img
                src="/about.jpg"
                alt="Our Studio"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://picsum.photos/seed/luxestudio/800/900";
                }}
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

         {/* Timeline */}
<div className="mb-24">
  <h2 className="text-3xl font-serif text-center mb-16">
    How We Got Here
  </h2>
  <div className="relative max-w-3xl mx-auto">
    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-zinc-200 md:-translate-x-1/2" />
    <div className="space-y-12">
      {timeline.map((item, idx) => (
        <motion.div
          key={item.year}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.3 }}
          className={`relative flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-10 pl-12 md:pl-0 ${
            idx % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          <div className="absolute left-4 md:left-1/2 top-1.5 w-3 h-3 rounded-full bg-zinc-900 -translate-x-1/2" />
          <div
            className={`md:w-1/2 ${
              idx % 2 === 1 ? "md:text-left" : "md:text-right"
            }`}
          >
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-400">
              {item.year}
            </span>
          </div>
          <div className="md:w-1/2 bg-white rounded-xl border border-zinc-100 shadow-sm p-6">
            <h3 className="text-lg font-serif text-zinc-900 mb-2">
              {item.title}
            </h3>
            <p className="text-sm text-zinc-500 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</div>

          {/* Values */}
          <div className="bg-zinc-50 p-12 md:p-24 text-center max-w-7xl mx-auto rounded-xl mb-24">
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

          {/* Team */}
          <div className="mb-24">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <h2 className="text-3xl font-serif mb-4">The People Behind It</h2>
              <p className="text-zinc-500 text-sm leading-relaxed">
                A small team, intentionally. Every person here touches every
                piece before it reaches you.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="aspect-4/5 bg-zinc-100 overflow-hidden rounded-xl mb-4">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-base font-semibold text-zinc-900">
                    {member.name}
                  </h3>
                  <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold mt-1">
                    {member.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-24">
            <h2 className="text-3xl font-serif text-center mb-12">
              What People Are Saying
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div
                  key={t.name}
                  className="bg-white rounded-xl border border-zinc-100 shadow-sm p-6 flex flex-col"
                >
                  <Quote size={24} className="text-zinc-200 mb-4" />
                  <p className="text-sm text-zinc-600 leading-relaxed flex-1 mb-4">
                    "{t.quote}"
                  </p>
                  <div>
                    <p className="text-sm font-semibold text-zinc-900">
                      {t.name}
                    </p>
                    <p className="text-xs text-zinc-400">{t.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center bg-zinc-900 text-white rounded-xl p-12 md:p-16">
            <h2 className="text-3xl font-serif mb-4">
              See the Collection for Yourself
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Every piece we make is built to be lived in, not just looked at.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center px-8 py-4 bg-white text-zinc-900 text-xs font-bold uppercase tracking-widest hover:bg-zinc-100 transition-all rounded-lg"
            >
              Shop the Collection
              <ArrowRight size={14} className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;