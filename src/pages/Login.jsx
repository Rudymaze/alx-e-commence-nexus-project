import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/authStore";
import { Input } from "../components/common/FormElement";
import Button from "../components/common/Button";
import Card from "../components/common/Card";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit: (values) => {
      // In a real app, you would make an API call here
      // This is just a mock implementation
      setTimeout(() => {
        login({
          id: 1,
          email: values.email,
          firstName: "John",
          lastName: "Doe",
        });
        navigate("/");
      }, 1000);
    },
  });

  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-secondary-dark">
          Sign In
        </h1>
        <Card>
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.email && formik.errors.email}
            />

            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.password && formik.errors.password}
            />

            <Button type="submit" fullWidth className="mt-4">
              Sign In
            </Button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <a
                href="/register"
                className="text-secondary-DEFAULT hover:underline">
                Create account
              </a>
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Login;
