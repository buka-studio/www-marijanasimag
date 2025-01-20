'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import { Stamp } from './stamp';

const stamps = [
  { id: 1, year: '1972', category: 'Commemorative', country: 'Uruguay' },
  { id: 2, year: '1779', category: 'Historical', country: 'Gibraltar' },
  { id: 3, year: '1985', category: 'Landscape', country: 'Argentina' },
  { id: 4, year: '2001', category: 'Cultural', country: 'Spain' },
  { id: 5, year: '1990', category: 'Flora', country: 'Brazil' },
  { id: 6, year: '1968', category: 'Fauna', country: 'Peru' },
];

export function StampCollection() {
  const [selectedStamp, setSelectedStamp] = useState<number | null>(null);

  const constraintElement = useRef(null);

  return (
    <div className="h-full min-h-screen bg-stone-200 p-28">
      <div className=" h-full">
        <div className="grid h-full gap-20 lg:grid-cols-[1fr,1.5fr]">
          <div className="h-full max-w-xl space-y-5 text-stone-600">
            <h1 className="text-base font-bold text-stone-800">
              A Journey Through Stamps: Reimagined
            </h1>

            <p>
              Paying homage to my grandpa&apos;s lifelong passion for philately, by recreating his
              stamps in a digital form, exploring the blend of art, history, and typography and
              bringing it online for a new audience to enjoy.
            </p>

            <p>
              Each stamp tells a story—of a moment in history, a place, or an idea. This collection
              is my way of bridging the past and present, honoring my grandfather&apos;s stamp
              collection, which was later passed down to my mom. Now, I&apos;m adding my own
              creative twist. Whether it&apos;s a direct recreation of an original or a design
              inspired by a stamp I stumbled upon, every piece carries a narrative of exploration
              and admiration for philately.
            </p>

            <p>
              Many of these stamps are rooted in history, recreated from designs found in my
              grandfather&apos;s and moms collection or discovered during my research. Others are
              purely imaginative—a tribute to the art of stamp design.
            </p>

            <div>
              {selectedStamp && (
                <div className="mt-14 flex flex-col ">
                  <p className="mb-4 rounded-lg bg-stone-100 px-3 py-2 text-stone-600">
                    This stamp was inspired by an existing stamp, hover here to see it, and read
                    more about it below to dig a bit deeper into the story behind it.
                  </p>
                  <dl>
                    <hr className="my-3 border-t border-stone-300" />
                    <div className="flex  justify-between">
                      <dt className="text-stone-600">Year</dt>
                      <dd className="text-stone-800">{stamps[selectedStamp - 1].year}</dd>
                    </div>
                    <hr className="my-4 border-t border-stone-300" />

                    <div className="flex justify-between">
                      <dt className="text-stone-600">Category</dt>
                      <dd className="text-stone-800">{stamps[selectedStamp - 1].category}</dd>
                    </div>
                    <hr className="my-4 border-t border-stone-300" />

                    <div className="flex justify-between">
                      <dt className="text-stone-600">Country</dt>
                      <dd className="text-stone-800">{stamps[selectedStamp - 1].country}</dd>
                    </div>
                    <hr className="my-4 border-t border-stone-300" />
                  </dl>
                </div>
              )}
            </div>
          </div>

          {/* This section renders the stamp collection within a container.
              It uses AnimatePresence to handle the presence of the stamps in the DOM with animations.
              Each stamp is rendered using the Stamp component, which is passed various props including the image source, index, selection state, and click handler. */}
          <div className="pl-50 pt-70 relative h-full border border-black" ref={constraintElement}>
            <AnimatePresence>
              {stamps.map((stamp, index) => (
                <Stamp
                  key={stamp.id}
                  constraintElement={constraintElement}
                  stamp={
                    <Image
                      src={`/home/photos/stamp_0${index}.svg`}
                      alt=""
                      width={300}
                      height={450}
                    />
                  }
                  index={index}
                  isSelected={selectedStamp === stamp.id}
                  onClick={() => setSelectedStamp(stamp.id)}
                  selectedStamp={selectedStamp}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
