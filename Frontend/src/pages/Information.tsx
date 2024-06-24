// import React from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";

export const Information = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col w-3/4 float-right mr-10 mt-10">
      <Container className="bg-gray-50 col-start-2 col-end-12 mt-1 mb-6 shadow-lg rounded-lg h-full">
        <div className="bg-indigo-500 text-white rounded-t-md shadow-lg">
          <div className="flex justify-center items-center h-12">
            <h1 className="py-2 text-2xl font-bold uppercase">User Manual</h1>
          </div>
        </div>
        <div className="px-5 text-gray-600">
          <h3 className="mt-3 text-center">Welcome</h3>
          <h3 className="mb-3 text-center">
            These are few Guidelines for user:
          </h3>
          <div className="text-sm">
            <h2 className="text-lg font-semibold mt-3 mb-1">
              1. Voter Registration
            </h2>
            <ul className="list-disc ml-8">
              <li className="my-1">
                For casting the vote, the user needs to first register himself.
                For this registration purpose, the user will be provided a voter
                registration form on this website.
              </li>
              <li className="my-1">
                The voter can only register in the registration phase. After the
                registration phase is over, the user cannot register and thus
                will not be able to vote.
              </li>
              {/* Additional registration steps */}
            </ul>
            <h2 className="text-lg font-semibold mt-6 mb-1">
              2. Voting Process
            </h2>
            <ol className="list-decimal ml-8">
              <li className="my-1">
                <span className="font-bold">Registration Phase:</span> During
                this phase, the registration of the users (who are going to cast
                the vote) will be carried out.
              </li>
              <li className="my-1">
                <span className="font-bold">Voting Phase:</span> After
                initialization of voting phase from the admin, users can cast
                the vote in the voting section. The casting of the vote can be
                simply done by clicking on the “VOTE” button, after which the
                transaction will be initiated and after confirming the
                transaction, the vote will be successfully casted. After the
                voting phase is over, users will not be able to cast the vote.
              </li>
              {/* Additional voting process steps */}
            </ol>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-blue-600 text-white rounded px-8 py-2.5 m-5 hover:bg-blue-500"
            onClick={() => navigate("/voter-registration")}
          >
            PROCEED TO REGISTRATION
          </button>
        </div>
      </Container>
    </div>
  );
};
