import React from 'react';
import { testimonials } from '../../util/util';

function Testimonials() {
  return (
    <section
      className='relative min-h-screen flex flex-col items-center bg-white px-6 py-20'
    >
      {/* Sticky heading */}
      <div className='sticky top-1/2 transform -translate-y-1/2 text-center z-10'>
        <h2 className='text-5xl md:text-6xl font-extrabold leading-snug'>
          <span className='text-purple-400 block'>Don’t take</span>
          <span className='text-purple-600 block'>our word for it.</span>
        </h2>
        <p className='text-gray-700 max-w-2xl text-lg md:text-xl mt-6'>
          Hear what our clients have to say. Real feedback from real people who’ve
          experienced the difference.
        </p>
      </div>

      {/* Zig-zag glassmorphic cards with purple tint */}
      <div className='relative z-20 mt-12 flex flex-col gap-12 w-full max-w-4xl mx-auto'>
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`bg-purple-300/20 backdrop-blur-md border border-purple-300/30 rounded-2xl shadow-lg p-6 flex flex-col items-center text-center 
                        w-full md:w-3/4 
                        ${index % 2 === 0 ? 'self-start' : 'self-end'}`}
          >
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className='w-20 h-20 rounded-full object-cover mb-4 border-2 border-purple-300/40'
            />
            <p className='text-gray-900 italic mb-4'>“{testimonial.feedback}”</p>
            <p className='font-semibold text-gray-900'>{testimonial.name}</p>
            <p className='text-sm text-gray-700'>{testimonial.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Testimonials;