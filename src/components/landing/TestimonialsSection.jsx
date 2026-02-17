import { Star, Quote } from 'lucide-react'
import { testimonials } from '@/data/testimonials'

export default function TestimonialsSection() {
  return (
    <section className="py-20 sm:py-28 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-violet-600 dark:text-violet-400">
            Testimonios
          </p>
          <h2 className="mt-3 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonials grid */}
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-sm hover:shadow-md dark:border-gray-700 dark:bg-gray-800 transition-shadow"
            >
              <Quote size={32} className="text-violet-100 dark:text-violet-900/50 mb-4" />

              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} size={16} className="fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-6 flex items-center gap-3 border-t border-gray-100 dark:border-gray-700 pt-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
