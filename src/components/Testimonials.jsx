import { LazyMotion, m } from "framer-motion";
import { loadMotionFeatures } from "@/lib/motion";

const testimonials = [
  {
    name: "C’est juste trop génial.",
    text: "Mon fils passe son temps à regarder ses propres dessins. Il les commente, les met en scène… Je ne pensais pas qu’une simple animation pouvait autant le captiver !",
    avatar: "/testimonial-1.svg",
  },
  {
    name: "Quelle diablerie !",
    text: "Mes petits-enfants pensent que je maîtrise une force occulte. C’est devenu un rituel du dimanche : on regarde leurs créations comme un court-métrage. Merci Minimoji !",
    avatar: "/testimonial-2.svg",
  },
];

export default function Testimonials() {
  return (
    <LazyMotion features={loadMotionFeatures}>
      <section className="section bg-white dark:bg-gray-900 font-sans" aria-labelledby="testimonials-heading">
        <div className="container-pg">
          <h2 id="testimonials-heading" className="text-center mb-8 font-display">
            Ils ont transformé <br className="sm:hidden" />
            le rêve de leurs enfants
          </h2>
          <div className="max-w-5xl mx-auto px-2 sm:px-4">
            <div className="grid gap-6 md:gap-8 md:grid-cols-2">
              {testimonials.map((t, i) => (
                <m.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  whileHover={{ y: -2 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", stiffness: 150, damping: 16, bounce: 0.12, delay: i * 0.05 }}
                  className="card relative bg-white dark:bg-white/10 p-6 sm:p-7 flex items-start gap-4 transition-all duration-300 shadow-[0_10px_30px_-8px_rgba(99,102,241,0.25)] hover:scale-[1.02] hover:ring-4 hover:ring-indigo-400/60 hover:shadow-[0_22px_80px_-10px_rgba(99,102,241,0.55)]"
                >
                  <m.img
                    src={t.avatar}
                    alt={t.name}
                    className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full object-cover cursor-pointer"
                    whileHover={{
                      scale: [1, 1.08, 1],
                      rotate: [0, -3, 3, -1.5, 1.5, 0],
                    }}
                    transition={{ duration: 0.4 }}
                  />
                  <div className="text-left">
                    <p className="font-display font-semibold text-gray-900 dark:text-gray-100 text-base mb-2">
                      {t.name}
                    </p>
                    <p className="font-sans text-sm md:text-base leading-snug text-gray-700 dark:text-gray-300">
                      {t.text}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
