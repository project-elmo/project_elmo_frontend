import { useState } from 'react';
import Section from '@/components/home/Section';
import { Feature } from '@/types';

interface Props {
  title: string;
  features: Feature[];
  reverse?: boolean;
}

export default function FeatureSection({
  title,
  features,
  reverse = false,
}: Props) {
  const [selected, setSelected] = useState(features[0]);

  return (
    <Section title={title}>
      <div
        className={`flex gap-12 justify-center ${
          reverse && 'flex-row-reverse'
        }`}
      >
        <ul className="flex flex-col gap-4 items-center">
          {features.map((feature) => (
            <li
              key={feature.title}
              className={`w-96 flex flex-col gap-4 border-2 border-gray-100 p-4 rounded-md whitespace-pre-wrap hover:bg-gray-100 cursor-pointer ${
                feature.title === selected.title && 'bg-gray-100'
              }`}
              onClick={() => setSelected(feature)}
            >
              <h3 className="text-2xl font-semibold">{feature.title}</h3>
              <p className="text-gray-500">{feature.description}</p>
            </li>
          ))}
        </ul>
        <div className="max-w-2xl h-[28rem]">
          <img src={selected.imageSrc} alt={selected.imageAlt} />
        </div>
      </div>
    </Section>
  );
}
