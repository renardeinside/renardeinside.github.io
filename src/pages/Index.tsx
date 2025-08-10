import NavBar from '@/components/Navbar';
import { Separator } from '@/components/ui/separator';
import { Link } from 'react-router-dom';
import Gradient from '@/components/Gradient';

export default function ProfilePage() {
  const projects = [
    {
      id: 1,
      title: 'Chatten',
      description:
        'End-to-end RAG application with source retriveal on Databricks Platform',
      background: (
        <Gradient
          placement={{ preset: 'scattered', count: 10, randomSeed: 42 }}
        />
      ),
      link: 'https://www.linkedin.com/pulse/end-to-end-rag-application-source-retriveal-platform-ivan-trusov-znvqf/',
    },
    {
      id: 2,
      title: 'Terrametria',
      description:
        'Population density map of Germany, with ETL and app logic on top the Databricks Platform.',
      background: (
        <Gradient
          preset="sunset"
          placement={{ preset: 'scattered', count: 20, randomSeed: 3 }}
        />
      ),
      link: 'https://www.linkedin.com/pulse/building-data-applications-databricks-apps-ivan-trusov-6pjwf',
    },
    {
      id: 3,
      title: 'Strophe',
      description: 'Minimalistic newtab extension for Chrome',
      background: (
        <Gradient
          preset="purple"
          placement={{ preset: 'edges', count: 10, randomSeed: 42 }}
        />
      ),
      link: 'https://chromewebstore.google.com/detail/strophe/nfeehfdifaamihffeabhamemjjgnfnkp?authuser=0&hl=en-GB&pli=1',
    },
    {
      id: 4,
      title: 'Valentine',
      description: 'Something personal',
      background: <Gradient preset="fire" />,
      link: '/valentine',
    },
    {
      id: 5,
      title: 'Trifold',
      description:
        'A full-stack real-time table editor built with FastAPI, React, Databricks Apps and Lakebase.',
      background: (
        <Gradient preset="rose" placement={{ count: 1, randomSeed: 100 }} />
      ),
      link: 'https://www.linkedin.com/pulse/building-real-time-table-editor-databricks-apps-lakebase-ivan-trusov-pfq8f/',
    },
  ];

  return (
    <>
      <NavBar />
      <div className="w-full">
        <div className="container mx-auto px-10 py-8 font-mono max-w-5xl">
          <div className="mb-12 flex flex-col text-left">
            <div className="relative h-32 w-32 overflow-hidden mb-4">
              <img src="/logo.svg" alt="Ivan Trusov" />
            </div>
            <h1 className="text-3xl font-bold">Ivan Trusov</h1>
            <Separator className="my-4" />
            <p className="text-muted-foreground max-w-3xl text-balance">
              Passionate developer and architect, with primary focus on Data, ML
              and fullstack development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 w-full">
            {projects.map(project => (
              <Link
                key={project.id}
                to={project.link}
                className="group relative aspect-[4/3] overflow-hidden bg-muted min-h-48 min-w-48 flex justify-center items-center"
              >
                <div className="absolute top-0 left-0 w-full p-4 text-white z-10 pointer-events-none sm:pointer-events-auto">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <Separator className="mb-2 bg-white w-3/4" />
                </div>
                {project.background}
                <div className="absolute inset-0 bg-black/60 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center sm:opacity-0 group-hover:sm:opacity-100 group-active:opacity-100">
                  <div className="p-4 text-white">
                    <p className="text-sm">{project.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
