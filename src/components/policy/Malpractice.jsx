import { useEffect } from "react";


const DataScience = () => {
  // scrollTo
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);
  return (
    <>
      <noscript>
        <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
         height="0"
         width="0"
         style="display:none;visibility:hidden">
        </iframe>
      </noscript>
      <div className="mb-28">
        <p
          className="px-4 pt-16 pb-6 text-3xl font-bold text-left text-black sm:px-9"
        >
           Malpractice Policy of AI Expert Career
        </p>
        {/* <div className="flex justify-center">
          <p className="flex justify-center w-8 h-1 bg-red-500 rounded-lg"></p>
        </div> */}
        <div>
          <p className=" text-left mx-4 sm:ml-9 lg:w-[85%]">
          <h2 className="mb-2 text-xl font-bold">Introduction</h2>
          
          AI Expert Career is committed to maintaining the highest standards of integrity and fairness in its assessment processes. This Malpractice Policy outlines the processes and procedures to be followed in the event of any reported activity or practice that deliberately contravenes regulations, compromises the integrity of our assessment processes, or jeopardizes the validity of certification.
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Definition of Malpractice:</h2>
          
          Malpractice is defined as any deliberate action or behaviour, or the intention to deceive or manipulate, that undermines the fairness and reliability of our assessment processes or compromises the validity of the certification. This includes but is not limited to, cheating, plagiarism, impersonation, collusion, and any other form of dishonesty.<br />
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Reporting Malpractice:</h2>
          
          <ul className="ml-4"><b>1. Learners or Stakeholders:</b>	 Any individual who becomes aware of or suspects malpractice is encouraged to report it promptly to AI Expert Career. Reports can be made through designated channels, such as a dedicated email address or an online reporting form.</ul>
          <ul className="ml-4"><b>2. Staff Obligations:</b> AI Expert Career staff who suspect or receive information about malpractice are obligated to report it to the designated authority within the organization.</ul>
         

          <h2 className="mt-4 mb-2 text-xl font-bold">Investigation Process:</h2>

          <ul className="ml-4"> <b>1. Receipt of Report:</b> </ul>
          <li className="ml-8">Upon receiving a report of malpractice, AI Expert Career will acknowledge receipt within five (5) working days.</li>
          <ul className="ml-4"> <b>2. Preliminary Assessment:</b> </ul>
          <li className="ml-8">A preliminary assessment will be conducted to determine the nature and severity of the alleged malpractice. The assessment will be completed within ten (10) working days.</li>
          <ul className="ml-4"> <b>3. Formal Investigation:</b> </ul>
          <li className="ml-8">If the preliminary assessment indicates the need for further investigation, a formal investigation will be initiated. An investigation team, independent of the incident, will be appointed to conduct a thorough review.</li>
          <ul className="ml-4"> <b>4. Communication with Parties Involved:</b> </ul>
          <li className="ml-8">Parties involved, including the accused, will be informed of the investigation and allowed to provide their account.</li>

          <ul className="ml-4"> <b>5. Decision and Outcomes:</b>	</ul>
          <li className="ml-8">The investigation team will present its findings and recommendations to the relevant authority within twenty (20) working days.</li>
          <li className="ml-8">Based on the findings, appropriate actions will be taken, including disciplinary measures if necessary.</li>
          


         <h2 className="mt-4 mb-2 text-xl font-bold " >Appeal Process:</h2>

          <ul className="ml-4"><b>1.	Appeal Submission:</b> </ul>
          <li className="ml-8">Individuals found responsible for malpractice have the right to appeal the decision within ten (10) working days of being informed.</li>
          <ul className="ml-4"> <b>2.	Appeals Review:</b></ul>
          <li className="ml-8">An independent Appeals Officer, not involved in the initial investigation, will review the appeal and provide a final decision within fifteen (15) working days.</li>

          
          <h2 className="mt-4 mb-2 text-xl font-bold">Final Decision:</h2>
          
          The decision of the Appeals Officer is final and binding.

          <h2 className="mt-4 mb-2 text-xl font-bold">Confidentiality:</h2>
          
          All information related to the malpractice investigation will be treated confidentially, with access restricted to those directly involved in the investigation process.

          
          <h2 className="mt-4 mb-2 text-xl font-bold">Review and Updates:</h2>
          
          This Malpractice Policy will be reviewed annually to ensure its effectiveness. Updates will be made as necessary to align with best practices and legal requirements.<br /><br />

          <p className="mt-2 font-bold">Date of Implementation: <span className="text-red-500">05 January 2024</span></p>
          <br />
          Public Relations Officer <br />
          AI Expert Career Management

          </p>
          

        </div>

        
      </div>
    </>
  );
};

export default DataScience;
