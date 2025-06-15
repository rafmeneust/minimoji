import { motion } from "framer-motion";

const testimonials = [
  {
    name: "C’est juste trop génial.",
    text: "Mon fils passe son temps à regarder ses propres dessins. Il les commente, les met en scène… Je ne pensais pas qu’une simple animation pouvait autant le captiver !",
    avatar: "/testimonial-1.png",
  },
  {
    name: "Quelle diablerie !",
    text: "Mes petits-enfants pensent que je maîtrise une force occulte. C’est devenu un rituel du dimanche : on regarde leurs créations comme un court-métrage. Merci Minimoji !",
    avatar: "/testimonial-2.png",
  },
];

export default function Testimonials() {
  return (
    <section className=" dark:bg-gray-900 transition-colors duration-500 py-24 px-4 sm:px-6 md:px-8 font-sans">
      <h2 className="text-2xl sm:text-3xl md:text-3xl font-extrabold mb-12 text-center text-gray-900 dark:text-white leading-snug max-w-2xl mx-auto">
        Ils ont transformé <br className="sm:hidden" />
        le rêve de leurs enfants
      </h2>

      <div className="max-w-5xl w-full mx-auto px-2 sm:px-4 md:px-0 grid gap-6 sm:gap-8 md:grid-cols-2">
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
            className="flex items-start gap-4 bg-white/90 dark:bg-white/10 backdrop-blur-lg p-5 sm:p-6 rounded-3xl shadow-sm border border-white/90 dark:border-white/20"
          >
            <motion.img
              src={t.avatar}
              alt={t.name}
              className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover cursor-pointer"
              whileHover={{
                scale: [1, 1.15, 1],
                rotate: [0, -4, 4, -2, 2, 0],
              }}
              transition={{ duration: 0.4 }}
            />
            <div className="text-left">
              <p className="font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-2">
                {t.name}
              </p>
              <p className="text-sm sm:text-[0.95rem] md:text-base leading-snug text-gray-700 dark:text-gray-300 font-poppins">
                {t.text}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}