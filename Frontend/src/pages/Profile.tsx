// import React, { useEffect, useState } from "react";
import { Container } from "../components/Container";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAuthState } from "../store/auth";

export default function Profile() {
  const {profile} = useSelector(getAuthState)
  
  const navigate = useNavigate();
  return (
    <div className="flex flex-col w-full md:w-3/4 md:float-right md:mr-10 h-screen mt-10">
      <Container
        className={"bg-white col-start-2 col-end-12 mt-1 mb-6 shadow-2xl"}
      >
        <div className="bg-blue-500 text-center text-white rounded-t-md shadow-lg">
        <h1 className="py-2 text-lg font-bold">Your Profile</h1>
      </div>
        <div className="flex items-center">
          <img
            // src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTqX5-Bk8Cxg5Cam2G8AIwPv2kaNOw8Vm1DKw&usqp=CAU"
            src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ4NDQ4IDQ0ODg0NDQ0ODw8ODw4PFREWFhURExMYHi0gGBolGxMTITEhJSkrLi4uFx8zODMsNygtLisBCgoKDQ0NDg8NDisZFRkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAOEA4QMBIgACEQEDEQH/xAAaAAEBAQEBAQEAAAAAAAAAAAAAAwQCBQEH/8QALRABAAIBAQYDCQADAAAAAAAAAAECAxEEITFBUXFhgaESFCIyQlKRwdETsfD/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AP3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHy1ogH0SnJPJxMgt7cdYfP8AJCQCv+SH2Lx1RAaBndxknuCo5raJdAAAAAAAAAAAAAAAAAAle+u6OAPt8nT8pgAAAAAAAAA7rk6uAGgRpbTssAAAAAAAAAAAAAD5adIBxkty/KYAAAAACeTNWvHj0hGdqnlEee8GoZY2qecV9YVx5628J6SCoAAADvHbk4AaBzS2sOgAAAAAAAAAAEss79FWeZAAAAAQ2jNpujjz8FrTpEz03vPtOszM8wfAFQABp2fN9M+U/ppea9DHb2qxKK6AAAB1jnSVmdeJ3A+gAAAAAAAAA5vwlFXJwSAAAABPP8luzC3Z/knswqAAgAA2bL8vnLG2bL8vnKCwAoAArj4JKYuEgoAAAAAAAAADjJwSWvwlEAAAAHy0axMdY0efaNJ0nk9FDaMOvxRx5x1BkAVAAB6GKvs1iP8AtUNmw/VPlH7aUUAAAAUxc01cXAHYAAAAAAAAADO0JZI39wcAAAADi+WteM7+nNG21dI/Mgrkw1t4T1hGdlnlNfPc+e9W6V9T3q3SvqBGy25zX1lbHgrG/jPij71bpX1PerdK+oNYyxtU84jyWx5q28J6SCgAAAC9Y0hKkaysAAAAAAAAAAA5vXWHQDOO8lebgBDaM2nw14856KZb+zWZ58I7sAACoAAAAAA04M/028paXmtuz39qvjG5FVB1SuvYHeOukd3YAAAAAAAAAAAAAI3rp2WAedtk8I7yzNu2YLT8VY1iI3xzYlQAAAAAAAAX2SfimOsINWx4LTMWndX/AH2BprXVaI0IjR9RQAAAAAAAAAAAAAAABDNs1b7+E9Y/a4DzMuy3ry9qOsfxB7Tm+OtuMVnvAPHHpW2PHP3R2n+uJ2Gv3W9FRgG/3Gv3W9HVdipH3T3n+A85bHs17cI0jrO56NMVa8K1jx5u0Vnw7JWu+finx4fhoAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH/2Q=="
            alt="profile"
            className="w-50 h-50"
          ></img>
          <div className="ml-5">
            <p className="text-2xl font-semibold text-gray-800">
              NAME: {profile?.name.toUpperCase()}
            </p>
            <p className="text-lg text-gray-600">
              Voter ID/ Epic No: {profile?.voterId}
            </p>
            <p className="text-lg text-gray-600">
              Aadhaar No: {profile?.adhar}
            </p>
            <p className="text-lg text-gray-600">DOB: {profile?.dob}</p>
            <p className="text-lg text-gray-600">AGE: {profile?.age}</p>
            <p className="text-lg text-gray-600">Address: {profile?.address}</p>
          </div>
        </div>
      </Container>
      <div className="flex justify-center mt-10 md:mt-20">
        <button
          className="bg-blue-600 text-white font-bold text-xl md:text-xl p-3 rounded-md shadow-md hover:bg-blue-500 transition duration-300"
          onClick={() => navigate("/voting-area")}
        >
          GO TO VOTING AREA
        </button>
      </div>
    </div>
  );
}
