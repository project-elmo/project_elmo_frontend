import { MdOutlineAdd } from 'react-icons/md';

export default function TestMain() {
  return (
    <main className="flex-1">
      <section className="h-full m-auto relative">
        <div className="w-full h-full flex flex-col items-center justify-center text-line">
          <h3>Please select a model.</h3>
          <p>
            Or click
            <span className="mx-2 font-semibold">
              <MdOutlineAdd className="inline-block" /> New Model
            </span>
            and start training your own LLM.
          </p>
        </div>
      </section>
    </main>
  );
}
