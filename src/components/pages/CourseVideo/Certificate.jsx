/* eslint-disable react/prop-types */
import html2pdf from "html2pdf.js";
import { useEffect, useState } from "react";
import { MdDownloadForOffline } from "react-icons/md";
import CertificateImage from "../../../../src/assets/certificate/Certificate.jpg";
const Certificate = ({ id, progressPercentage,reload }) => {

  const [course, setCourse] = useState({});
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetch(`https://ai-server-sooty.vercel.app/singleEnrolledcourse/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCourse(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id, reload]);

  const { _id, name, courseTitle, completionTime } = course;

  // const nameClass = name?.length > 18 ? 'left-[270px]' : 'left-[440px]';

  const generatePdf = () => {
    const pdfOptions = {
      margin: 0,
      filename: "certificate.pdf",
      image: { type: "jpeg", quality: 1 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "mm", format: "a3", orientation: "landscape" },
    };
    const aspectRatio = 816 / 1056; // Height / Width
    const content = `
    <div style="width: 1056px; height: ${
      1452 * aspectRatio
    }px; relative border-2 border-primary">
    <div class="absolute inset-0">
      <!-- Use the image as an <img> element -->
      <img src=${CertificateImage} style="width: 100%; height: 100%;" alt="Certificate Background" />

      <!-- Content to overlay on the image -->
      <p class="absolute top-[408px]  left-[160px] text-primary font-bold text-6xl">${name}</p>
      <p class="absolute top-[590px]  left-[160px] text-primary font-bold text-4xl">${courseTitle}</p>
      <p class="absolute top-[645px]  left-[160px] text-black  text-2xl">${completionTime}</p>
      <p class="absolute top-[990px]  left-[660px] text-black  text-2xl">AIEC${_id}</p>
    </div>
  </div>
    `;

    html2pdf()
      .from(content)
      .set(pdfOptions)
      .outputPdf("bloburi")
      .then((pdfDataUri) => {
        const link = document.createElement("a");
        link.href = pdfDataUri;
        link.download = "certificate.pdf";

        link.click();
      });
  };

  const handleButtonClick = () => {
    setTimeout(() => {
      generatePdf();
    }, 2000); // 2000 milliseconds = 2 seconds
  };

  return (
    <div className="">
      <button
        className="flex items-center gap-2 text-lg"
        onClick={handleButtonClick}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <MdDownloadForOffline />
            Certificate
          </>
        )}
      </button>

      <div>
        <p></p>
      </div>
    </div>
  );
};

export default Certificate;
