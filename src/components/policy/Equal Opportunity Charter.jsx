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
           Equal Opportunity Charter Policy of AI Expert Career
        </p>
        {/* <div className="flex justify-center">
          <p className="flex justify-center w-8 h-1 bg-red-500 rounded-lg"></p>
        </div> */}
        <div>
          <p className=" text-left mx-4 sm:ml-9 lg:w-[85%]">
          <h2 className="mb-2 text-xl font-bold">Introduction</h2>
          
          AI Expert Career is committed to providing an inclusive and welcoming environment for all clients and users. This Equal Opportunity Charter Policy reaffirms our dedication to fair treatment and equal opportunities for everyone, irrespective of gender, age, ethnicity, disability, sexual orientation, gender reassignment, religion, or belief. We believe in fostering diversity and creating a space where every individual can thrive.
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Principles</h2>
          
          <ul className="ml-8"><b>1.	Non-Discrimination:</b> AI Expert Career is committed to providing services and opportunities without discrimination. We treat all clients and users with respect and dignity.</ul>
          <ul className="ml-8"><b>2.	Diversity and Inclusion:</b> We value diversity and strive to create an inclusive environment that celebrates differences and promotes equal opportunities for all.</ul>
          <ul className="ml-8"><b>3.	Accessible Services:</b> Our services are designed to be accessible to everyone, including individuals with disabilities. We work to identify and remove barriers that may hinder equal access.</ul>
          <ul className="ml-8"><b>4.	Fair Treatment:</b> AI Expert Career ensures fair and consistent treatment for all clients and users, regardless of background or identity.</ul>
          <ul className="ml-8"><b>5.	Zero Tolerance for Discrimination:</b> Discrimination, harassment, or victimization based on gender, age, ethnicity, disability, sexual orientation, gender reassignment, religion, or belief is strictly prohibited within AI Expert Career.</ul>

          
          <h2 className="mt-4 mb-2 text-xl font-bold">Implementation:</h2>
          
          <ul className="ml-8"><b>1.	Training and Awareness:</b> We provide regular training to our staff and stakeholders to promote awareness of equal opportunity principles and foster a culture of inclusion.</ul> 
          <ul className="ml-8"><b>2.	Accessible Facilities and Resources:</b> AI Expert Career strives to make our physical and digital spaces accessible to individuals with varying needs, ensuring that our services are available to all.</ul> 
          <ul className="ml-8"><b>3.	Responsive Policies:</b> Our policies are regularly reviewed to ensure alignment with equal opportunity principles. We are responsive to feedback and continuously seek ways to improve our practices.</ul> 
          <ul className="ml-8"><b>4.	Complaints Procedure:</b> AI Expert Career has established a transparent and accessible complaints procedure for individuals who believe they have experienced discrimination. The procedure ensures fair investigation and resolution.</ul> 


          <h2 className="mt-4 mb-2 text-xl font-bold">Accountability:</h2>
          All members of the AI Expert Career community, including staff, instructors, and learners, are accountable for upholding the principles of this Equal Opportunity Charter. Any breaches of this policy will be addressed promptly and appropriately.
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Review and Updates:</h2>
          
          This Equal Opportunity Charter Policy will be reviewed periodically to ensure its effectiveness. Updates will be made as necessary to align with evolving best practices and legal requirements.
          
          <h2 className="mt-4 mb-2 text-xl font-bold">Client Confidence:</h2>
          
          This policy aims to instil confidence in our clients and users, assuring them that AI Expert Career is committed to providing an environment where everyone is treated with dignity and respect. <br /><br />
          
          
          <p className="mt-2 font-bold">Date of Implementation: <span className="text-red-500">05 January 2024</span></p>
          <br />
          Business Development Officer <br />
          AI Expert Career Management

          </p>
          

        </div>

        
      </div>
    </>
  );
};

export default DataScience;
