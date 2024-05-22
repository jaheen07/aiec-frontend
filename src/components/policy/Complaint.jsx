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
           Complaints Policy of AI Expert Career
        </p>
        {/* <div className="flex justify-center">
          <p className="flex justify-center w-8 h-1 bg-red-500 rounded-lg"></p>
        </div> */}
        <div>
          <p className=" text-left mx-4 sm:ml-9 lg:w-[85%]">
          <h2 className="mb-2 text-xl font-bold">Introduction</h2>
          
          AI Expert Career is dedicated to maintaining the highest standards in the delivery of our training programs and services. We recognize the importance of addressing concerns promptly and fairly. This Complaints Policy outlines our formal complaints procedure, emphasizing our commitment to resolving complaints transparently and satisfactorily. <br /><br />
          This policy ensures that all complaints are handled with diligence, impartiality, and sensitivity, to reach a resolution that satisfies the complainant.
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Scope</h2>
          
          This policy applies to all individuals, including learners, clients, and other stakeholders, who wish to raise a formal complaint regarding any aspect of AI Expert Career's operations, services, or interactions.<br />
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Grounds for Appeal</h2>
          
          Complaints may be submitted on various grounds, including but not limited to:
          
          <ul>1.	Quality of training delivery.</ul>
          <ul>2.	Conduct of staff or mentors.</ul>
          <ul>3.	Administrative processes.</ul>
          <ul>4.	Communication-related issues.</ul>
          <ul>5.	Discrimination or harassment concerns.</ul>

          <h2 className="mt-4 mb-2 text-xl font-bold">Complaints Process:</h2>
          
          <h2 className="mt-4 mb-2 font-bold text-md">Informal Resolution (Stage 1):</h2>
          
          <li>Complainants are encouraged to discuss their concerns informally with their assigned mentor, instructor, or relevant contact within five (5) working days of the issue arising.</li>
          <li>The aim is to address and resolve the complaint at this stage.</li>

          <h2 className="mt-4 mb-2 font-bold text-md">Formal Complaint Submission (Stage 2):</h2>
          
          <li>If the complaint remains unresolved, the complainant may submit a formal written complaint to the Complaints Officer within ten (10) working days.</li>
          <li>The written complaint should include a clear description of the issue, relevant details, and the desired resolution.</li>

          <h2 className="mt-4 mb-2 font-bold text-md">Complaints Investigation (Stage 3):</h2>
          
          <li>The Complaints Officer will conduct a thorough investigation within fifteen (15) working days.</li>
          <li>The officer may seek additional information from relevant parties and will strive for a fair and impartial resolution.</li>

          <h2 className="mt-4 mb-2 font-bold text-md"> Outcome Communication (Stage 4):</h2>
         
         <li>The complainant will receive a written notification of the investigation's outcome, including reasons for the decision, within five (5) working days of the completion of the investigation.</li>


         <h2 className="mt-4 mb-2 font-bold text-md " >Appeal Process (Stage 5):</h2>
          
          If the complainant is dissatisfied with the outcome, they may request an appeal within ten (10) working days. The appeal will be reviewed by an independent Appeals Officer not previously involved in the complaint.
          
          <h2 className="mt-4 mb-2 font-bold text-md">Final Decision:</h2>
          
          The decision of the Appeals Officer is final and binding.

          <h2 className="mt-4 mb-2 font-bold text-md">Confidentiality:</h2>
          
          All information related to the complaints process will be treated confidentially, with access restricted to those directly involved in the complaint resolution.

          <h2 className="mt-4 mb-2 font-bold text-md">Learning and Improvement:</h2>
          
          AI Expert Career is committed to learning from complaints to continually improve our services and operations.
          <h2 className="mt-4 mb-2 font-bold text-md">Review and Updates:</h2>
          
          This Complaints Policy will be reviewed periodically to ensure its effectiveness. Updates will be communicated to all stakeholders. <br /><br />
          Learners and other stakeholders are encouraged to familiarize themselves with this policy and utilize the outlined procedure when filing a formal complaint with AI Expert Career.
          
          <p className="mt-2 font-bold">Date of Implementation: <span className="text-red-500">05 January 2024</span></p>
          <br />
          Operation Officer <br />
          AI Expert Career Management

          </p>
          

        </div>

        
      </div>
    </>
  );
};

export default DataScience;
