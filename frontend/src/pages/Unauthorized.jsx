export default function Unauthorized() {
  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0d0d0d",
      color: "white",
      flexDirection: "column",
      fontFamily: "Barlow, sans-serif"
    }}>
      <h1 style={{
        fontSize: "60px",
        fontWeight: "800",
        color: "#f0a500",
        marginBottom: "10px",
        letterSpacing: "2px"
      }}>
        403
      </h1>

      <h2 style={{
        fontSize: "24px",
        marginBottom: "10px"
      }}>
        Access Denied
      </h2>

      <p style={{
        color: "#777",
        marginBottom: "25px"
      }}>
        You don’t have permission to access this page.
      </p>

      <a href="/dashboard" style={{
        padding: "12px 25px",
        background: "#f0a500",
        color: "#000",
        textDecoration: "none",
        fontWeight: "600",
        letterSpacing: "1px"
      }}>
        Go to Dashboard
      </a>
    </div>
  );
}