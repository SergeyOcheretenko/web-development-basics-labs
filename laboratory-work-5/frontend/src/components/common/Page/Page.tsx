type PageProps = {
  children: React.ReactNode;
}

export function Page({ children }: PageProps): JSX.Element {
  return <div style={{
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
  </div>;
}