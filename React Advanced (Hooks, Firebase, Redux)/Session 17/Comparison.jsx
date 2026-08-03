function Comparison() {
  const points = [
    {
      title: "1. Less Boilerplate Code",
      formik: `<Field name="email" />\n<ErrorMessage name="email" />\n// Formik handles value, onChange, error display`,
      manual: `const [email, setEmail] = useState("")\nconst [emailError, setEmailError] = useState("")\n<input value={email} onChange={...} />\n{emailError && <p>{emailError}</p>}`,
      note: "Formik eliminates the need for per-field useState + manual error display logic.",
    },
    {
      title: "2. Built-in Touched Tracking",
      formik: `{touched.email && errors.email && <p>{errors.email}</p>}\n// Formik auto-sets touched on blur`,
      manual: `const [emailTouched, setEmailTouched] = useState(false)\n// Must manually track touched state per field\n// onBlur={() => setEmailTouched(true)}`,
      note: "Formik tracks which fields the user has interacted with — no manual touched state per field.",
    },
    {
      title: "3. Declarative Schema Validation (Yup)",
      formik: `const schema = Yup.object({\n  email: Yup.string().email().required(),\n  password: Yup.string().min(6).required()\n})\n// Single schema, auto-validates on submit/change`,
      manual: `if (!email.includes("@")) setEmailError("Invalid email")\nif (password.length < 6) setPasswordError("Too short")\n// Custom validate function per field\n// Must maintain validation logic separately`,
      note: "Yup schemas are declarative, testable, and reusable — no scattered if/else validation blocks.",
    },
  ];

  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-3xl">
      <h2 className="text-2xl font-bold text-white mb-4">
        Task 5: Formik/Yup vs Manual useState
      </h2>

      <div className="space-y-4">
        {points.map((p, i) => (
          <div key={i} className="bg-gray-700 rounded-xl p-4">
            <h3 className="text-purple-400 font-bold text-sm mb-3">
              {p.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-green-400 text-xs font-semibold mb-1">
                  Formik + Yup
                </p>
                <pre className="text-gray-300 text-xs whitespace-pre-wrap font-mono">
                  {p.formik}
                </pre>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <p className="text-red-400 text-xs font-semibold mb-1">
                  Manual useState
                </p>
                <pre className="text-gray-300 text-xs whitespace-pre-wrap font-mono">
                  {p.manual}
                </pre>
              </div>
            </div>

            <p className="text-gray-400 text-xs">{p.note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Comparison;