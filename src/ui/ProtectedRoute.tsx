import React, { useEffect } from "react";
import { useUser } from "../features/authentication/useUser";
import Spinner from "./Spinner";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FullPage = styled.div`
  height: 100svh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isUserLoading, isAuthenticated } = useUser();

  // 3. If there is no authenticated user, redirect to login page
  useEffect(() => {
    if (!isUserLoading && !isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, isUserLoading, navigate]);

  // 2. While loading, show spinner
  if (isUserLoading) {
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );
  }

  // 4. If there is a user, render the app
  if (isAuthenticated) {
    return children;
  }
}

export default ProtectedRoute;
