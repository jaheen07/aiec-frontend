import { useState } from 'react';
import { FaMinusSquare, FaPlusSquare } from 'react-icons/fa';
import SubTitle from './SubTitle';

// import {
//   aiSubTitles,
//   statisticalSubTitles,
//   visualizationSubTitles,
//   machineGeneral,
//   machineMethods,
//   machineUseCases,
//   machineImportantLibraries,
//   deepNeuralNetworks,
//   deepArchitectures,
//   deepTraining,
//   deepTools,
//   deepModel,
//   dataEngineer,
// } from './AllSubTitles';
import { Link , useLocation} from 'react-router-dom';
import { isAxiosError } from 'axios';

const LeftNav = ({ onItemClick }) => {
  const location = useLocation();
  const splited = location.pathname.split("/");
  
  const allpolicies = [
    'Terms-&-Conditions',
    'Privacy-Policy',
    'Refund-Policy',
    'Complaint-Policy',
    'Appeals-Policy',
    'Malpractice-Policy',
    'Course-Content-Review-Policy',
    'Equal-Opportunity-Charter-Policy',
    
  ];
  const [isSelected, setSelect] = useState('');

  
  const handleItemClick = (item) => {
    // onItemClick(item);
    const select = item;
    
    // setAiSubTitle(!aiSubTitle);
    setSelect(select.e);    
  };

  return (
    <div className="lg:pl-24"> 
      <div className="h-screen py-6 pl-4 bg-slate-50">
        
        {allpolicies.map((e)=>(
        <div className="mb-2">
          <div key={e} className={splited[2] == e? "text-[#283357] text-lg font-bold cursor-pointer flex items-center bg-slate-200 rounded-l-full":"text-lg font-bold flex items-center hover:bg-slate-100"}>
            <Link to={`/policies/${e.trim().replace(/\s+/g, "-")}`}>
              <p
                // onClick={() => handleItemClick({e})}
                className="py-2 pl-4"
              >
                {e.replaceAll("-", " ")}
              </p>
            </Link>
            {/* <span>
            
              {aiSubTitle ? (
                <FaPlusSquare className="text-2xl text-red-500" />
              ) : (
                <FaMinusSquare className="text-2xl text-red-500" />
              )}
            </span> */}
          </div>
          {/* <div className={aiSubTitle ? 'hidden' : 'py-1'}>
            <SubTitle subtitles={aiSubTitles} />
          </div> */}
        </div>
        ))}
        
        
        {/* Data Science Roadmap */}
        {/* <div>
          <div className="text-[#283357] text-2xl font-bold cursor-pointer flex items-center">
            <Link to="aiexpert/dataScience">
              <p
                style={{ fontFamily: 'Josefin Sans' }}
                onClick={() => handleItemClick('DataScience')}
                className="py-2"
              >
                Data Science Roadmap
              </p>
            </Link>
            <span
              onClick={() => {
                setDataSubTitle(!dataSubTitle);
              }}
            >
              {dataSubTitle ? (
                <FaPlusSquare className="text-2xl text-red-500" />
              ) : (
                <FaMinusSquare className="text-2xl text-red-500" />
              )}
            </span>
          </div>
          <div className={dataSubTitle ? 'hidden' : 'block  '}>
            <div>
              <p className="pb-3 mx-4">Statistical Skills</p>

              <SubTitle subtitles={statisticalSubTitles} />
            </div>
            <div>
              <p className="pb-3 mx-4">Visualization</p>

              <SubTitle subtitles={visualizationSubTitles} />
            </div>
          </div>
        </div> */}
        
        
      </div>
    </div>
  );
};
export default LeftNav;
