import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const router = useRouter();
  const handleLogin = async () => {
    if (!email || !password) {
      setError(true);
      return;
    } else {
      setError(false);
    }
    let response = await fetch("http://localhost:3000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, login: true }),
    });
    const res = await response.json();
    if (res.success) {
      const { result } = res;
      delete result.password;
      localStorage.setItem("user", JSON.stringify(result));
      if (props.redirect) {
        router.push("/order");
      } else {
        router.push("/");
      }
    } else {
      alert("Login Failed");
    }
  };
  return (
    <>
      <div className="login-component">
        <h3>Login Component</h3>
        <div>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="text"
              name=""
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email Id"
            />
            {error && !email && (
              <span className="input-error">Email is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <input
              className="input-field"
              type="password"
              name=""
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="Enter Password"
            />
            {error && !password && (
              <span className="input-error">Password is required</span>
            )}
          </div>
          <div className="input-wrapper">
            <button className="button" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
