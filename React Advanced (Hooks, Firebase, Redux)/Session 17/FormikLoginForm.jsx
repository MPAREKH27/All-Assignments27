import { Formik, Form, Field } from "formik";

function FormikLoginForm() {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">
        Task 2: Formik Login
      </h2>
      <p className="text-gray-400 text-xs mb-4">
        Using &lt;Formik&gt;, &lt;Form&gt;, &lt;Field&gt;, handleChange, values
      </p>

      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, { resetForm }) => {
          console.log("Formik submitted:", values);
          alert(`Email: ${values.email}\nPassword: ${values.password}`);
          resetForm();
        }}
      >
        {({ values, handleChange }) => (
          <Form className="flex flex-col gap-3">
            <Field
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              value={values.email}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
            <Field
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              value={values.password}
              className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 focus:outline-none focus:border-purple-500 text-sm"
            />
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 text-white font-semibold text-sm hover:bg-purple-700 transition-colors"
            >
              Login
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default FormikLoginForm;