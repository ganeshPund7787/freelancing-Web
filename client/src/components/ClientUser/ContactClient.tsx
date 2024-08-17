// import { useAppSelectore } from "@/App/store";
// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const Contact = () => {
//   const [landLoard, setLandLoard] = useState(null);
//   const [loading, setLoading] = useState(null);
//   const [message, setMessage] = useState("");
//   const { Client } = useAppSelectore((s) => s.client);
//   const { CurrentCivilUser } = useAppSelectore((s) => s.user);

//   const onChange = (e) => {
//     setMessage(e.target.value);
//   };

//   useEffect(() => {
//     const fetchLandloard = async () => {
//       try {
//         // const res = await fetch(`/api/user/${listing.userRef}`);
//         // const data = await res.json();
//         // setLandLoard(data);
//       } catch (error) {
//         console.log(`Error While fetchning user in contact : ${error}`);
//       }
//     };
//     fetchLandloard();
//   }, [listing.userRef]);
//   return (
//     <>
//       {landLoard && (
//         <div className="flex flex-col gap-2">
//           <p className="font-bold">
//             Contact{" "}
//             <span className="font-semibold">
//               {CurrentCivilUser?.fullName} for
//             </span>{" "}
//             <span className="font-semibold">
//               {CurrentCivilUser?.name.toLowerCase()}
//             </span>
//           </p>
//           <textarea
//             value={message}
//             onChange={onChange}
//             name="message"
//             id="message"
//             rows={2}
//             className="w-full border p-3 rounded-lg"
//             placeholder="Enter your message here..."
//           ></textarea>
//           <div className="flex justify-evenly my-4">
//             <Link
//               className="bg-orange-600 text-white text-center p-3 uppercase rounded-lg hover:bg-orange-400"
//               to={`mailto:${Client?.email}?subject=regarding${Client?.fullName}&body${message}`}
//             >
//               Send Message
//             </Link>
//             <Link
//               className="bg-red-600 text-white text-center p-3 uppercase rounded-lg hover:bg-red-400"
//               to={"/"}
//             >
//               cancel
//             </Link>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default Contact;
