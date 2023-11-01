import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiFillGithub } from 'react-icons/ai';
import {
  HOME_APPLICATIONS,
  HOME_HISTORY,
  HOME_TEST,
  HOME_TRAINING,
  ROUTES,
  SERVICE_NAME,
} from '@/constants';

export default function HomePage() {
  const [selectedTraining, setSelectedTraining] = useState(HOME_TRAINING[0]);
  const [selectedTest, setSelectedTest] = useState(HOME_TEST[0]);
  const [selectedHistory, setSelectedHistory] = useState(HOME_HISTORY[0]);

  return (
    <main className="flex-1 flex flex-col gap-10">
      <section className="flex items-center gap-6 py-20 px-16 bg-gradient-to-r from-cyan-500 to-blue-500">
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

      <section className="p-4">
        <h2 className="text-center mb-8">Applications</h2>
        <ul className="flex justify-center gap-6">
          {HOME_APPLICATIONS.map((application) => (
            <li
              key={application.title}
              className="flex flex-col items-center gap-2 w-1/4 p-8 bg-gray-100 rounded-md text-center"
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
      </section>

      <section className="p-4">
        <h2 className="text-center mb-8">Training</h2>
        <div className="flex gap-12 justify-center">
          <ul className="flex flex-col gap-4 items-center">
            {HOME_TRAINING.map((process) => (
              <li
                key={process.title}
                className={`w-96 flex flex-col gap-4 border-2 border-gray-100 p-4 rounded-md whitespace-pre-wrap hover:bg-gray-100 cursor-pointer ${
                  process.title === selectedTraining.title && 'bg-gray-100'
                }`}
                onClick={() => setSelectedTraining(process)}
              >
                <h3 className="text-2xl font-semibold">{process.title}</h3>
                <p className="text-gray-500">{process.description}</p>
              </li>
            ))}
          </ul>
          <div className="max-w-2xl h-[28rem]">
            <img
              src={selectedTraining.imageSrc}
              alt={selectedTraining.imageAlt}
            />
          </div>
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-center mb-8">Test</h2>
        <div className="flex gap-12 justify-center">
          <div className="max-w-2xl h-[28rem]">
            <img src={selectedTest.imageSrc} alt={selectedTest.imageAlt} />
          </div>
          <ul className="flex flex-col gap-4 items-center">
            {HOME_TEST.map((process) => (
              <li
                key={process.title}
                className={`w-96 flex flex-col gap-4 border-2 border-gray-100 p-4 rounded-md whitespace-pre-wrap hover:bg-gray-100 cursor-pointer ${
                  process.title === selectedTest.title && 'bg-gray-100'
                }`}
                onClick={() => setSelectedTest(process)}
              >
                <h3 className="text-2xl font-semibold">{process.title}</h3>
                <p className="text-gray-500">{process.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="p-4">
        <h2 className="text-center mb-8">History</h2>
        <div className="flex gap-12 justify-center">
          <ul className="flex flex-col gap-4 items-center">
            {HOME_HISTORY.map((process) => (
              <li
                key={process.title}
                className={`w-96 flex flex-col gap-4 border-2 border-gray-100 p-4 rounded-md whitespace-pre-wrap hover:bg-gray-100 cursor-pointer ${
                  process.title === selectedHistory.title && 'bg-gray-100'
                }`}
                onClick={() => setSelectedHistory(process)}
              >
                <h3 className="text-2xl font-semibold">{process.title}</h3>
                <p className="text-gray-500">{process.description}</p>
              </li>
            ))}
          </ul>
          <div className="max-w-2xl h-[28rem]">
            <img
              src={selectedHistory.imageSrc}
              alt={selectedHistory.imageAlt}
            />
          </div>
        </div>
      </section>

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
