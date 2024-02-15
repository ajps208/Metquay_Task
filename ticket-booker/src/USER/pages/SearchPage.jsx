import React from "react";
import BasicExample from "../components/Header";
import { Container } from "react-bootstrap";
import SearchPost from "../components/SearchPost";

function SearchPage() {
  return (
    <div
      style={{
        backgroundColor: " #130f40",
        backgroundImage: "linear-gradient(315deg, #130f40 0%, #000000 74%)",
        color: "white",
      }}
    >
      <BasicExample />
      <Container>
        <SearchPost></SearchPost>
      </Container>
    </div>
  );
}

export default SearchPage;
