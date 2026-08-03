import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const playlistSchema = Yup.object({
  name: Yup.string()
    .required("Playlist name is required"),
  description: Yup.string(),
  genre: Yup.string()
    .required("Please select a genre"),
});

function PlaylistForm() {
  return (
    <div className="bg-gray-800 rounded-2xl p-6 shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold text-white mb-1">
        Task 4: Spotify Playlist Form
      </h2>
      <p className="text-gray-400 text-xs mb-4">
        Formik + Yup · Errors show only after field touched
      </p>

      <Formik
        initialValues={{ name: "", description: "", genre: "" }}
        validationSchema={playlistSchema}
        onSubmit={(values, { resetForm }) => {
          console.log("Playlist created:", values);
          alert(
            `Playlist Created!\nName: ${values.name}\nGenre: ${values.genre}\nDesc: ${values.description || "(none)"}`
          );
          resetForm();
        }}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="flex flex-col gap-3">
            <div>
              <Field
                name="name"
                placeholder="Playlist name *"
                className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border text-sm focus:outline-none focus:border-purple-500 ${
                  touched.name && errors.name
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              />
              <ErrorMessage
                name="name"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            <div>
              <Field
                as="textarea"
                name="description"
                placeholder="Description (optional)"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-gray-700 text-white placeholder-gray-400 border border-gray-600 text-sm focus:outline-none focus:border-purple-500 resize-none"
              />
            </div>

            <div>
              <Field
                as="select"
                name="genre"
                className={`w-full px-4 py-3 rounded-xl bg-gray-700 text-white border text-sm focus:outline-none focus:border-purple-500 ${
                  touched.genre && errors.genre
                    ? "border-red-500"
                    : "border-gray-600"
                }`}
              >
                <option value="">Select genre *</option>
                <option value="pop">Pop</option>
                <option value="rock">Rock</option>
                <option value="hip-hop">Hip-Hop</option>
                <option value="electronic">Electronic</option>
                <option value="classical">Classical</option>
                <option value="jazz">Jazz</option>
                <option value="bollywood">Bollywood</option>
              </Field>
              <ErrorMessage
                name="genre"
                component="p"
                className="text-red-400 text-xs mt-1"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 rounded-xl bg-green-500 text-white font-semibold text-sm hover:bg-green-600 transition-colors disabled:opacity-50"
            >
              Create Playlist
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default PlaylistForm;