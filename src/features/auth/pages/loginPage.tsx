import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";

// ✅ typed redux hooks (important)
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { loginUser } from "../api/authSlice";

// shadcn components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// ✅ form type
interface LoginFormData {
  username: string;
  password: string;
}

function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ✅ strongly typed state
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });

  const { isLoading, isError, message, accessToken } = useAppSelector(
    (state) => state.auth
  );

  const { username, password } = formData;

  // ✅ Auto redirect if logged in
  useEffect(() => {
    if (accessToken) {
      navigate("/comments");
    }
  }, [accessToken, navigate]);

  // ✅ typed change handler
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // ✅ typed submit handler
  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username || !password) return;

    try {
      const resultAction = await dispatch(
        loginUser({ username, password })
      );

      // ✅ cleaner way using unwrap (recommended)
      if (loginUser.fulfilled.match(resultAction)) {
        navigate("/comments");
      }

    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[400px] shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl">
            Login
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isError && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {message}
            </p>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <Input
              type="text"
              name="username"
              placeholder="Username (emilys)"
              value={username}
              onChange={onChange}
              disabled={isLoading}
            />

            <Input
              type="password"
              name="password"
              placeholder="Password (emilyspass)"
              value={password}
              onChange={onChange}
              disabled={isLoading}
            />

            <Button
              className="w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default LoginPage;