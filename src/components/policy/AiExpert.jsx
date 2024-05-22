import { Link, NavLink } from "react-router-dom";
import { useEffect } from "react";
import useTitle from "../../hooks/useTitle";

const AiExpert = () => {
  // scrollTo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  useTitle("Policy");
  return (
    <>
      <div className="mt-20 mb-28">
        <p
          
          className="py-5 text-3xl font-bold text-center text-black"
        >
          Ai Expert Career Roadmap
        </p>
        <div className="flex justify-center">
          <p className="flex justify-center w-8 h-1 bg-red-500 rounded-lg"></p>
        </div>

        {/* <div className="justify-center gap-8 md:flex mt-11">
          <NavLink to="/policies/datascience">
            <div>
              <img
                src={dataScience}
                alt=""
                className="pointer-events-none select-none no-select unselectable"
              />
              <span>Complaints Policy</span>
            </div>
          </NavLink>
          <Link to="/roadmap/aiexpert/machinelearning">
            <div className="flex items-center px-4 py-6 mb-3 bg-white rounded-sm md:px-12 gap-x-2">
              <img
                src={machineLearning}
                alt=""
                className="select-none h-[30px] pointer-events-none no-select unselectable"
              />
              <span>Machine Learning Roadmap</span>
            </div>
          </Link>
          <Link to="/roadmap/aiexpert/deeplearning">
            <div className="flex items-center px-4 py-6 mb-3 bg-white rounded-sm md:px-12 gap-x-2 ">
              <img
                src={dataScience}
                alt=""
                className="select-none h-[40px] pointer-events-none no-select unselectable"
              />
              <span>Deep Learning Roadmap</span>
            </div>
          </Link>
          <Link to="/roadmap/aiexpert/dataengineer">
            <div className="flex items-center px-4 py-6 mb-3 bg-white rounded-sm md:px-12 gap-x-2 ">
              <img
                src={dataScience}
                alt=""
                className="select-none h-[40px] pointer-events-none no-select unselectable"
              />
              <span>Data Engineer Roadmap</span>
            </div>
          </Link>
        </div> */}

        <div>
          <h2 className="text-xl text-center mt-11">Disclamimer</h2>
          <div className="flex justify-center">
            <p className="text-center  mt-4 lg:w-[80%] mx-auto">
              {`Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.`}
            </p>
          </div>
        </div>

        {/* <div className="justify-center mt-20 lg:flex gap-x-8 ">
          <div className="relative">
            <img className="" src={chooseSvg} alt="" />
            <a href="" className="absolute text-red-500 top-1 left-40 ">
              papers with code
            </a>
            <a href="" className="absolute text-red-500 top-[120px] left-11 ">
              Data science
            </a>
            <a
              href=""
              className="absolute text-red-500 top-[120px] left-[280px] "
            >
              papers with code
            </a>
            <a href="" className="absolute text-red-500 top-[163px] left-11 ">
              Machine learning
            </a>
            <a
              href=""
              className="absolute text-red-500 top-[166px] left-[280px] "
            >
              papers with code
            </a>
            <a href="" className="absolute text-red-500 top-[205px] left-11 ">
              papers with code
            </a>
            <a href="" className="absolute text-red-500 top-[253px] left-11 ">
              Deep learning
            </a>
            <a href="" className="absolute text-red-500 top-[300px] left-11 ">
              Data Engineer
            </a>
          </div>
          <div className="space-y-2">
            <h2 className="text-center">Required for any skill</h2>
            <p className="px-12 py-3 text-lg text-white bg-red-500 rounded-full">
              papers with code
            </p>
            <p className="px-12 py-3 text-lg text-white bg-red-500 rounded-full">
              Get version controll
            </p>
            <p className="px-12 py-3 text-lg text-white bg-red-500 rounded-full">
              semantic versioning
            </p>
            <p className="px-12 py-3 text-lg text-white bg-red-500 rounded-full">
              keep a changelog
            </p>
          </div>
        </div> */}

        {/* <div className="w-[100%]  ">
          <div className="justify-center mt-36 lg:flex ">
            <div className=" relative w-[1000px] ">
              <img className="" src={fundamentalsSvg} alt="" />

              <h1 className="absolute top-[10px] left-[423px]">Fundamentals</h1>
              <h1 className="absolute top-[100px] left-[459px]">Basic</h1>
              <a
                href=""
                className="absolute text-red-500 top-[150px] left-[420px]"
              >
                Database basic
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[200px] left-[413px]"
              >
                Reporting & Analysis
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[250px] left-[427px]"
              >
                Tabular Data
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[300px] left-[412px]"
              >
                Data Frames & Series{" "}
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[345px] text-[13px] text-center left-[405px]"
              >
                TExtract, Transform, Load <br /> (ETL)
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[400px] left-[377px]"
              >
                Reporting vs Bt vs Analytics
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[450px] left-[427px]"
              >
                Data formats
              </a>
              <a
                href=""
                className="absolute text-red-500 top-[500px] left-[380px]"
              >
                Regular Expressions (RegEx)
              </a>

              <a
                className="absolute text-red-500  top-[220px] left-[154px]"
                href=""
              >
                JSON
              </a>
              <a
                className="absolute text-red-500  top-[262px] left-[158px]"
                href=""
              >
                XML
              </a>
              <a
                className="absolute text-red-500  top-[304px] left-[158px]"
                href=""
              >
                CSV
              </a>

              <a
                className="absolute text-red-500  top-[150px] text-xs left-[690px]"
                href=""
              >
                Relational vs non-relational database
              </a>
              <a
                className="absolute text-red-500  top-[188px]  left-[680px] text-[13.5px]"
                href=""
              >
                SQL + Joins (inner, outer, theta join)
              </a>
              <a
                className="absolute text-red-500  top-[225px]  left-[770px] "
                href=""
              >
                NoSDL
              </a>

              <h1 className="absolute top-[595px] left-[420px]">
                Python programing
              </h1>
              <a
                className="absolute text-red-500  top-[640px] left-[430px]"
                href=""
              >
                Python Basics
              </a>
              <a
                className="absolute text-red-500  top-[680px] left-[430px]"
                href=""
              >
                Important Libraries
              </a>
              <a
                className="absolute text-red-500  top-[720px] left-[410px]"
                href=""
              >
                Virtual Environments
              </a>
              <a
                className="absolute text-red-500  top-[758px] left-[400px]"
                href=""
              >
                Jupyter Notebookes / Lab
              </a>

              <a
                className="absolute text-red-500  top-[603px] left-[90px]"
                href=""
              >
                Expressions
              </a>
              <a
                className="absolute text-red-500  top-[645px] left-[100px]"
                href=""
              >
                Variables
              </a>
              <a
                className="absolute text-red-500  top-[685px] left-[85px]"
                href=""
              >
                Data Structures
              </a>
              <a
                className="absolute text-red-500  top-[725px] left-[90px]"
                href=""
              >
                Functions
              </a>
              <a
                className="absolute text-red-500  top-[765px] left-[40px] text-[13.5px]"
                href=""
              >
                Install packages (Via pip, condia etc)
              </a>
              <a
                className="absolute text-red-500  top-[805px] left-[70px]"
                href=""
              >
                Codestyle, e.g. PEFB
              </a>

              <a
                className="absolute text-red-500  top-[603px] left-[730px]"
                href=""
              >
                JSON
              </a>
              <a
                className="absolute text-red-500  top-[645px] left-[730px]"
                href=""
              >
                XML
              </a>
              <a
                className="absolute text-red-500  top-[685px] left-[730px]"
                href=""
              >
                CSV
              </a>

              <h1 className="absolute top-[860px] left-[430px]">
                Data Sources
              </h1>
              <a
                className="absolute text-red-500  top-[905px] left-[430px]"
                href=""
              >
                Data Mining
              </a>
              <a
                className="absolute text-red-500  top-[945px] left-[430px]"
                href=""
              >
                Web Scraping
              </a>
              <a
                className="absolute text-red-500  top-[985px] left-[390px]"
                href=""
              >
                Awesome Public Database
              </a>
              <a
                className="absolute text-red-500  top-[1025px] left-[448px]"
                href=""
              >
                Kaggle
              </a>

              <h1 className="absolute top-[1135px] left-[390px]">
                Exploratory Data Analysis/
                <br />
                Data Munging/Wrappings
              </h1>
              <a
                className="absolute text-red-500  top-[1200px] text-[13.5px] left-[390px] text-center"
                href=""
              >
                Principle Component Analysis
                <br />
                (PCA)
              </a>
              <a
                className="absolute text-red-500  top-[1250px] text-[13.5px] left-[390px] text-center"
                href=""
              >
                Dimensionality & Numeresity
                <br />
                Reduction
              </a>
              <a
                className="absolute text-red-500  top-[1305px]  left-[460px] text-center"
                href=""
              >
                Normalization
              </a>

              <a
                className="absolute text-red-500  top-[1340px] text-[13.5px] left-[400px] text-center"
                href=""
              >
                Data Scrubbing,
                <br />
                Handling Missing Values
              </a>
              <a
                className="absolute text-red-500  top-[1392px]  left-[402px] text-center"
                href=""
              >
                Unblased Estimation
              </a>
              <a
                className="absolute text-red-500  top-[1435px]  left-[405px] text-center"
                href=""
              >
                Binning Sparse Values
              </a>
              <a
                className="absolute text-red-500  top-[1473px]  left-[410px] text-center"
                href=""
              >
                Feature Extraction
              </a>
              <a
                className="absolute text-red-500  top-[1514px]  left-[445px] text-center"
                href=""
              >
                Denoising
              </a>
              <a
                className="absolute text-red-500  top-[1555px]  left-[445px] text-center"
                href=""
              >
                Sampling
              </a>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default AiExpert;
