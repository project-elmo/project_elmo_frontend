import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import Section from '@/components/home/Section';
import FeatureSection from '@/components/home/FeatureSection';
import {
  HOME_APPLICATIONS,
  HOME_HISTORY,
  HOME_TEST,
  HOME_TRAINING,
  ROUTES,
  SERVICE_NAME,
} from '@/constants';

export default function HomePage() {
  return (
    <main className="flex-1 flex flex-col gap-10">
      <section className="flex justify-center items-center gap-6 py-20 px-16 bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="max-w-3xl flex-1 flex flex-col gap-6 text-white">
          <h1>Make your own GPT</h1>
          <p className="text-2xl font-light mb-4">
            Even if you don't have a background in artificial intelligence , you
            can train Large Language Models (LLMs) to make your own GPT with{' '}
            {SERVICE_NAME}.
          </p>
          <Link to={ROUTES.TRAINING} className="btn">
            Get Started
          </Link>
        </div>
        <div className="flex justify-center">
          <img src="/logo512.png" className="w-[40%]" />
        </div>
      </section>

      <Section title="Applications">
        <ul className="flex justify-center gap-6">
          {HOME_APPLICATIONS.map((application) => (
            <li
              key={application.title}
              className="flex flex-col items-center gap-2 w-1/4 max-w-sm p-8 bg-gray-100 rounded-md text-center"
            >
              <h3>{application.title}</h3>
              <ul className="flex flex-col gap-4 text-left list-disc">
                {application.contents.map((content, i) => (
                  <li key={i} className="ml-6">
                    {content}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </Section>

      <FeatureSection title="Training" features={HOME_TRAINING} />
      <FeatureSection title="Test" features={HOME_TEST} reverse />
      <FeatureSection title="History" features={HOME_HISTORY} />

      <footer className="text-center p-20 bg-secondary">
        <Link
          to="https://github.com/project-elmo"
          target="_blank"
          className="inline-block text-center"
        >
          <div className="flex flex-col items-center gap-2 hover:scale-105">
            <p className="font-semibold">TEAM ELMO</p>
            <AiFillGithub className="text-6xl" />
          </div>
        </Link>
      </footer>
    </main>
  );
}
