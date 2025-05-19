import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { registerUser, loginUser } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function Auth() {
  const [loginError, setLoginError] = useState("");
  const [registerError, setRegisterError] = useState("");
  const [isManager, setIsManager] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const email = e.target["login-email"].value;
    const password = e.target["login-password"].value;

    try {
      const data = await loginUser({ email, password });
      login(data);
      navigate("/profile");
    } catch (error) {
      setLoginError(error.message);
    }
  }

  async function handleRegister(e) {
    e.preventDefault();
    const name = e.target["register-name"].value;
    const email = e.target["register-email"].value;
    const password = e.target["register-password"].value;
    const confirm = e.target["register-confirm"].value;

    if (password !== confirm) {
      setRegisterError("Passwords do not match");
      return;
    }

    try {
      await registerUser({ name, email, password, venueManager: isManager });
      const data = await loginUser({ email, password });
      login(data);
      navigate("/profile");
    } catch (error) {
      setRegisterError(error.message);
    }
  }

  return (
    <div className="bg-white min-h-screen font-body text-primary">
      <div className="max-w-xl mx-auto py-12 px-4">
        <section className="mb-12">
          <h2 className="text-3xl font-heading font-bold text-center mb-4">Log In</h2>
          <p className="text-center mb-6 font-semibold">Log in to your account</p>
          <form className="space-y-4" onSubmit={handleLogin}>
            <InputField label="Email" name="login-email" />
            <InputField label="Password" name="login-password" type="password" />
            <a href="#" className="text-sm text-red-600">Forgot your password?</a>
            {loginError && <p className="text-red-600 text-sm">{loginError}</p>}
            <Button type="submit" className="w-full">Log In</Button>
          </form>
        </section>

        <div className="flex items-center gap-2 my-8">
          <hr className="flex-grow border-gray-300" />
          <span className="text-sm font-medium text-gray-500">or</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <section>
          <h2 className="text-3xl font-heading font-bold text-center mb-4">Register</h2>
          <p className="text-center mb-6 font-semibold">Create a new account</p>
          <form className="space-y-4" onSubmit={handleRegister}>
            <InputField label="Name" name="register-name" />
            <InputField label="Email" name="register-email" />
            <InputField label="Password" name="register-password" type="password" />
            <InputField label="Confirm Password" name="register-confirm" type="password" />

            <label className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={isManager}
                onChange={() => setIsManager(!isManager)}
              />
              Register as venue manager
            </label>

            {registerError && <p className="text-red-600 text-sm">{registerError}</p>}
            <Button type="submit" className="w-full">Register</Button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default Auth;
