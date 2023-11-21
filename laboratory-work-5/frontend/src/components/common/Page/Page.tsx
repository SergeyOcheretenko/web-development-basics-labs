import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

type PageProps = {
  children: React.ReactNode;
}

export function Page({ children }: PageProps): JSX.Element {
  const navigate = useNavigate();
  
  return <div style={{ padding: "1rem" }}>
    <div style={{ display: "flex" }}>
      <Button onClick={() => navigate('/')}>Home</Button>
    </div>

    <div style={{
      width: "100%", 
      height: "100%", 
      display: "flex", 
      justifyContent: "center", 
      justifyItems: "center", 
      textAlign: "center", 
      alignItems: "center",
      alignContent: "center",
      paddingTop: "5rem",
      paddingBottom: "5rem"
    }}>
      {children}
    </div>
  </div>
}