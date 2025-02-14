import NavBar from "@/components/Navbar";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const projects = [
    {
      id: 1,
      title: "Chatten",
      description:
        "End-to-end RAG application with source retriveal on Databricks Platform",
      image: "chatten.png",
      link: "https://www.linkedin.com/pulse/end-to-end-rag-application-source-retriveal-platform-ivan-trusov-znvqf/",
    },
    {
      id: 2,
      title: "Terrametria",
      description:
        "Population density map of Germany, with ETL and app logic on top the Databricks Platform.",
      image: "terrametria.png",
      link: "https://www.linkedin.com/pulse/building-data-applications-databricks-apps-ivan-trusov-6pjwf",
    },
    {
      id: 3,
      title: "Strophe",
      description: "Minimalistic newtab extension for Chrome",
      image: "strophe.png",
      link: "https://chromewebstore.google.com/detail/strophe/nfeehfdifaamihffeabhamemjjgnfnkp?authuser=0&hl=en-GB&pli=1",
    },
    {
        id: 4,
        title: "Valentine",
        description: "Something personal",
        image: "https://media.giphy.com/media/9Y1LEFKsbbP4hrLgV3/giphy.gif",
        link: "/valentine",
    }
  ];

  return (
    <>
      <NavBar />
      <div className="w-full">
        <div className="container mx-auto px-4 py-8 font-mono max-w-5xl">
          <div className="mb-12 flex flex-col text-left">
            <div className="relative h-32 w-32 overflow-hidden mb-4">
              <img src="/logo.svg" alt="John Doe" />
            </div>
            <h1 className="text-3xl font-bold">Ivan Trusov</h1>
            <Separator className="my-4" />
            <p className="text-muted-foreground max-w-3xl text-balance">
              Passionate developer and architect, with primary focus on Data, ML
              and fullstack development.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-0 w-full">
            {projects.map((project) => (
              <Link
                key={project.id}
                to={project.link}
                className="group relative aspect-[4/3] overflow-hidden bg-muted min-h-48 min-w-48"
              >
                <div className="absolute top-0 left-0 w-full p-4 text-white z-10 pointer-events-none sm:pointer-events-auto">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <Separator className="mb-2 bg-white w-3/4" />
                </div>
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="object-cover transition-transform duration-300 group-hover:scale-110 group-hover:blur-0 group-hover:brightness-100 blur-sm brightness-75"
                />
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
