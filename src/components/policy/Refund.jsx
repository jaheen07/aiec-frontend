import { useEffect } from "react";


const Refund = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }, []);
    return (
        <div className="pt-16">
          <noscript>
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-KLCLKWNK"
            height="0"
            width="0"
            style="display:none;visibility:hidden">
            </iframe>
          </noscript>
          <div className="max-w-5xl pb-24 mx-4 sm:ml-9">
            <h1 className="mb-4 text-3xl font-bold">Refund or Cancellation Policy of AI Expert Career</h1>
            <p className="mb-4">
              Last Update: November 02, 2023
            </p>
            <div className="mb-8">
              <h3 className="mb-2 text-lg font-semibold">Live/Paid Course</h3>
              <p className="mb-2">
                If the course is cancelled for any reason before the date, then all participants will be refunded 100% of the paid amount within 7-10 working days of the cancellation date.
              </p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  If a learner wants to cancel the booking after the payment, he/she will have to notify the AIEC team for cancellation at least 2 days before the scheduled starting day of the course and the learner will be refunded the full amount within 7-10 working days from placement of notification of cancellation. For cancellation notification, email- support@aiexpertcareer.com
                </li>
                <li className="mb-2">
                  If the learner faces issues regarding schedule, date, time, or any other mentioned by the learners, the learner must notify our helpline number which is mentioned on our website or other respective support personnel of AIEC within 2 days of the start of the course. AIEC will try to compensate for this with other batches or possible convenient ways. If this can't be compensated, AIEC will refund that learner 80% of the paid money within 7-10 working days of the notification.
                </li>
                <li>
                  No refund policy will be applicable if 2 days go past the starting date of the course.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-2 text-lg font-semibold">AI Consultancy Service</h3>
              <p className="mb-2">
                If the booking is cancelled for any reason before the date or time is confirmed by us, then it will be refunded 100% of the paid amount within 7-10 working days of the cancellation date or time.
              </p>
              <ul className="mb-4 ml-6 list-disc">
                <li className="mb-2">
                  If a learner wants to cancel the booking after the payment, he/she will have to notify the AIEC team for cancellation at least 12 hours before the scheduled starting time of the meeting, and the learner will be refunded the full amount within 7-10 working days from placement of notification of cancellation. For cancellation notification, email- support@aiexpertcareer.com
                </li>
                <li>
                  No refund policy will be applicable if there is a personal reason or there is no valid reason. Everyone requested to overview all the details, career summary & experience of the Consultant. Fill up the booking form with very attention and keep details about your problem statement and what you need. AIEC team always helps you to select the proper consultant.
                </li>
              </ul>
            </div>
          </div>
        </div>
    );
};

export default Refund;